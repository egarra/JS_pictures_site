const changeModalState = (state) => {
        const priceSizePicture = document.querySelectorAll('#size'),
              materialPicture = document.querySelectorAll('#material'),
              addOptions = document.querySelectorAll('#options'),
              inputPromocode = document.querySelectorAll('.promocode');

        

        function bindActionsToElems (event, elem, prop) {
            elem.forEach((item) => {
                

              item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'INPUT' :
                        state[prop] = item.value;
                        break;
                    case 'SELECT' :
                        state[prop] = item.value;
                        break;
                }
              });           
        });
        
    }
    
    bindActionsToElems('change', priceSizePicture, 'size');
    bindActionsToElems('change', materialPicture, 'material');
    bindActionsToElems('change', addOptions, 'options');
    bindActionsToElems('input', inputPromocode, 'promo');
};

export default changeModalState;