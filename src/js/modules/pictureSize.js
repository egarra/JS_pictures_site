const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    function showPicture (block) {
        const picture = block.querySelector('img');
        picture.src = picture.src.slice(0, -4) + '-1.png';
        picture.classList.add('animated', 'fadeIn');
   
        block.querySelectorAll('p:not(.sizes-hit').forEach(p => {
            p.style.display = 'none';
        });
    }

    function hidePicture (block) {
        const picture = block.querySelector('img');
        picture.src = picture.src.slice(0, -6) + '.png';
        picture.classList.remove('animated', 'fadeIn');
 
        block.querySelectorAll('p:not(.sizes-hit').forEach(p => {
            p.style.display = 'block';
        });
    }

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            showPicture(block);
        });
        block.addEventListener('mouseout', () => {
            hidePicture(block);
        });
    });

};

export default pictureSize;