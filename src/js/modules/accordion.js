const accordion = (triggerSelector, blockContainer) => {
      const btns = document.querySelectorAll(triggerSelector),
            blocks = document.querySelectorAll(blockContainer);

      blocks.forEach(block => {
            block.style.display = 'none';
            block.classList.add('animated', 'fadeInDown');
      });
      
      btns.forEach((btn, i) => {
            btn.addEventListener('click', function() {
                

                if(this) {
                    blocks[i].style.display == 'none' ? blocks[i].style.display = 'block' : blocks[i].style.display = 'none';
                    this.classList.contains('active-style') ? this.classList.remove('active-style') : this.classList.add('active-style');
                }
            });
      });

};

export default accordion;