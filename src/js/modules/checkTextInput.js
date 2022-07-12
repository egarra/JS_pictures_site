const checkTextInput = (selector) => {
      const textInputs = document.querySelectorAll(selector);

      textInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if(e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();
            }
        });
      });
};

export default checkTextInput;