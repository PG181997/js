console.log('it works');
const textArea = document.querySelector('[name="text"]');
const result = document.querySelector('.result');
const filterInputs = Array.from(document.querySelectorAll('[name="filter"]'));

/* eslint-disable */
const funkyLetters = {
    '-': '₋', '!': 'ᵎ', '?': 'ˀ', '(': '⁽', ')': '₎', '+': '⁺', '=': '₌', '0': '⁰', '1': '₁', '2': '²', '4': '₄', '5': '₅', '6': '₆', '7': '⁷', 
    '8': '⁸', '9': '⁹', a: 'ᵃ', A: 'ᴬ', B: 'ᴮ', b: 'ᵦ', C: '𝒸', d: 'ᵈ', D: 'ᴰ', e: 'ₑ', E: 'ᴱ', f: '𝒻', F: 'ᶠ', g: 'ᵍ', G: 'ᴳ', h: 'ʰ', H: 'ₕ', I: 'ᵢ',
     i: 'ᵢ', j: 'ʲ', J: 'ᴶ', K: 'ₖ', k: 'ₖ', l: 'ˡ', L: 'ᴸ', m: 'ᵐ', M: 'ₘ', n: 'ₙ', N: 'ᴺ', o: 'ᵒ', O: 'ᴼ', p: 'ᵖ', P: 'ᴾ', Q: 'ᵠ', q: 'ᑫ', r: 'ʳ', R: 'ᵣ',
      S: 'ˢ', s: 'ˢ', t: 'ᵗ', T: 'ₜ', u: 'ᵘ', U: 'ᵤ', v: 'ᵛ', V: 'ᵥ', w: '𝓌', W: 'ʷ', x: 'ˣ', X: 'ˣ', y: 'y', Y: 'Y', z: '𝓏', Z: 'ᶻ'
  };
  /* eslint-enable */
// console.log(textArea)
// console.log(result)
// console.log(filterInputs)

function transformText(text){
    // take the text, and loop ech letter
    // const filter = document.querySelector(`[name = "filter"]:checked`).value;
    const filter = filterInputs.find(input => input.checked).value;
    console.log(filter)
    const mod = Array.from(text).map(filters[filter])
    console.log(mod);
    // console.log(text);
    result.textContent = mod.join('');
}

const filters = {
    sarcastic(letter, index){
        console.log(letter, index);
        if(index % 2){
            return letter.toUpperCase();
        }
        return letter.toLowerCase();
    },
    funky(letter){
        // first check if there is a funky letter for this case
        let fuckeyLetter = funkyLetters[letter];
        if(fuckeyLetter) return fuckeyLetter;
        //if there is not then check if there is one for the lower version
        funkeyLetter = funkyLetters[letter.toLowerCase()];
        if (funkeyLetter) return funkeyLetter;
        //if there is nothing, then return the regular letter
        return letter
    },
    unable(letter){
        const random = Math.floor(Math.random() * 3);
        if(letter === ' ' && random === 2){
            console.log('aaaaaa');
            return '...';
        };
        return letter
    },
};


textArea.addEventListener(`input`, e=> transformText(e.target.value));

filterInputs.forEach(input=>
    input.addEventListener('input', () => {
        transformText(textArea.value);
    }))