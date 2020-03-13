(function(){

    function ScrollPlanilhaVerificarIdx(arr, scrollTop) {
        for(var i in arr) {
            if( arr[i].acumulado > scrollTop ) {
                return i -1;
            }
        }
        return arr.length -1; // retornar último item
    }
    function ScrollPlanilhaPosicionar(arr, idx, elemento) {
        var temp = arr[idx];
        elemento.scrollTop = temp.acumulado;
        return temp.acumulado;
    }
    function ScrollPlanilha(elemento) {
        var bkScroll = elemento.scrollTop; // guardar a última posição
        var bkIdx = 0;
        var bkTamanhos = [];

        var linhas = elemento.querySelectorAll('tr');
        var acumulado = 0;
        for(var i = 0; i < linhas.length; i++) { // verificar o tamanho de cada item da tabela
            var temp = getComputedStyle( linhas[i] );
            var height = parseFloat( temp.height );
            bkTamanhos.push({ height: height, acumulado: acumulado });
            acumulado += height;
        }

        bkIdx = ScrollPlanilhaVerificarIdx( bkTamanhos, bkScroll );
        ScrollPlanilhaPosicionar( bkTamanhos, bkIdx, elemento );

        elemento.addEventListener('scroll', function(ev) {
            var diff = elemento.scrollTop - bkScroll;
            if( diff === 0 ) return; // nenhum scroll aconteceu
            if( Math.abs(diff) < 6 ) { // um giro curto aconteceu
                if( diff < 0 ) bkIdx--;
                else bkIdx++;
                bkScroll = ScrollPlanilhaPosicionar( bkTamanhos, bkIdx, elemento );
            } else { // um giro longo aconteceu
                bkIdx = ScrollPlanilhaVerificarIdx( bkTamanhos, elemento.scrollTop );
                bkScroll = ScrollPlanilhaPosicionar( bkTamanhos, bkIdx, elemento );
            }
        });
    }

    // ------------
    function aplicarScrollPlanilha() {
        var tabelas = document.querySelectorAll('table.scroll tbody');
        for( var i = 0; i < tabelas.length; i++ ) {
            ScrollPlanilha( tabelas[i] );
        }
    }
    // use essa função para aplicar o elemento as tabelas marcadas
    window.aplicarScrollPlanilha = aplicarScrollPlanilha;

})();

(function(){
    document.addEventListener('DOMContentLoaded', function() {
        aplicarScrollPlanilha();
    });
})();