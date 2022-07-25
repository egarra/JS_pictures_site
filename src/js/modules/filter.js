const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          no = document.querySelector('.portfolio-no'),
          menuBtns = menu.querySelectorAll('li'),
          wrapperImgs = wrapper.querySelectorAll('.portfolio-block');
 
    menuBtns.forEach(btn => {
        btn.addEventListener('click', () => {
        
            wrapperImgs.forEach(img => {

                img.style.display = 'none';
                img.classList.remove('animated', 'fadeIn');

                img.classList.forEach(item => {
                    if(btn.classList == item) {
                        img.style.display = 'block';
                        img.classList.add('animated', 'fadeIn');
                    } else {
                        no.style.display = 'block';
                        no.classList.add('animated', 'fadeIn');
                    }
                });
            });
        });
    });

    menu.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.tagName == "LI") {
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
        }
    });
};

export default filter;