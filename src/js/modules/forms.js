//import checkNumInputs from "./checkNumInputs";
import { postData } from "../../services/requests";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');

//checkNumInputs('input[name="user_phone"]');
    
    const message = {
          loading: 'загрузка',
          success: 'спасибо! мы скоро с вами свяжемся',
          failure: 'Что-то пошло не так...',
          spinner: 'assets/img/spinner.gif',
          ok: 'assets/img/ok.png',
          fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран";
            item.previousElementSibling.classList.add('animated', 'fadeInUp');
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots;
            const arr = item.files[0].name.split('.'); //получаем первый файл, который загрузил пользователь, затем имя этого файла, и делим его на часть до точки и после нее. получаем массив из двух файлов
            arr[0].length > 6 ? dots = '...' : dots = "."; // проверяем первый файл из массив на количество символов, и в зависимости от длины присваиваем значение в переменную dots;
            const name = arr[0].substring(0, 6) + dots + arr[1]; //обрезаем первый файл из массива до количества 5 символов, добавляем dots и второй файл из массива(то, что идет после точек)
            item.previousElementSibling.textContent = name; // записываем сформировавшееся имя в предыдущий элемент, где было указано "файл не выбран"
                
                if(item.closest('.first_upload') && item.files) {
                    let divBtn = document.querySelector('.first_upload'),
                        btn = divBtn.querySelector('button');
                    
                    btn.textContent = 'Отправить';
                    btn.classList.remove('animated', 'fadeIn', 'fadeInUp');
                    btn.classList.add('animated', 'fadeIn');

                    item.addEventListener('click', (e) => {
                        if(item.closest('.first_upload') && item.files && divBtn.childNodes[3].textContent !== "Файл не выбран") {
                            e.preventDefault();
                            
                            let formData = new FormData(divBtn.parentElement);
                            postData(path.designer, formData)
                                .then(res => {
                                    console.log(res);
                                    divBtn.childNodes[3].textContent = 'Отправлено!';
                                    divBtn.childNodes[3].classList.remove('animated', 'fadeIn', 'fadeInUp');
                                    divBtn.childNodes[3].classList.add('animated', 'fadeIn');
                                })
                                .finally(() => {
                                    setTimeout(() => {
                                        clearInputs();
                                        btn.textContent = 'Загрузить';
                                        btn.classList.remove('fadeInUp');
                                        btn.classList.add('fadeInUp');
                                    },2000);
                                   
                                });
                        }
                    });
                    
                    
                }
        });
    });


    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 1000);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            if(item.getAttribute('data-calc') === "end") {

                formData.append('total-price', document.querySelector('.calc-price').textContent);
                
                for(let key in state) {
                    formData.append(key, state[key]);
                }
            }
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res); 
                    console.log(item);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;    
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                    statusMessage.remove();
                    item.style.display = 'block';
                    item.classList.remove('fadeOutUp');
                    item.classList.add('fadeInUp');
                    }, 4000);
                });
        });
    });
};

export default forms;