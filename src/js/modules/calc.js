import { getResource } from "../../services/requests";

const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);
   


    function calcFunc(response) {
        let chosenSizePrice,
            chosenMaterialPrice,
            chosenOptionsPrice,
            sum;

        response.sizes.forEach(elem => {
            if(elem.name == sizeBlock.value) {
                chosenSizePrice = elem.price;
               }
        });

        response.materials.forEach(elem => {
            if(elem.name == materialBlock.value) {
                chosenMaterialPrice = elem.price;
            }
        });

        response.addOptions.forEach(elem => {
            if(elem.name == optionsBlock.value) {
                chosenOptionsPrice = elem.price;
            }

        });
        if(!chosenOptionsPrice) {
            sum = Math.round((+chosenSizePrice) * (+chosenMaterialPrice));
        } else {
            sum = Math.round((+chosenSizePrice) * (+chosenMaterialPrice) + (+chosenOptionsPrice));
        } 

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
        }
    }
        

     sizeBlock.addEventListener('change', () => {
        getResource('assets/priceList.json')
            .then((res) => {
                calcFunc(res);
            });
    });
    materialBlock.addEventListener('change', () => {
        getResource('assets/priceList.json')
            .then((res) => {
                calcFunc(res);
            });
    });
    optionsBlock.addEventListener('change', () => {
        getResource('assets/priceList.json')
            .then((res) => {
                calcFunc(res);
            });
    });
    promocodeBlock.addEventListener('input', () => {
        getResource('assets/priceList.json')
            .then((res) => {
                calcFunc(res);
            });
    });
}
export default calc;