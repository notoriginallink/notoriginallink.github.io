class CounterParameter {
    value = 0;

    constructor(parameter) {
        const buttons = parameter.querySelectorAll('button');
        this.decButton = buttons[0];
        this.incButton = buttons[1];
        this.inputElement = parameter.querySelector('input');

        const storedValue = parseInt(this.inputElement.value);
        if (!isNaN(storedValue)) {
            this.value = storedValue;
        }

        this.updateInput();

        this.decButton.addEventListener('click', this.decreaseInput);
        this.incButton.addEventListener('click', this.increaseInput);
    }

    decreaseInput = () => {
        if (this.value === 0)
            return;
        this.value -= 1;
        this.updateInput();
    }

    increaseInput = () => {
        if (this.value === 999)
            return;
        this.value += 1;
        this.updateInput();
    }

    updateInput = () => {
        this.inputElement.value = this.value.toString();
    }
}

class RangeParameter {
    value = 1;
    levels = [
        ['parameter__button_low', 'Завтра на работу'],
        ['parameter__button_mid', 'Обычная вечеринка'],
        ['parameter__button_high', 'Веский повод'],
        ['parameter__button_extreme', 'Легендарная встреча']
    ];

    constructor(parameter) {
        this.buttons = parameter.querySelectorAll('button');
        this.descriptionElement = parameter.nextElementSibling;
        this.updateRange();

        this.buttons.forEach(button=>
            button.addEventListener('click', () => this.changeRange(button)));
    }

    changeRange(button) {
        for (let i = 0; i < this.buttons.length; i++) {
            const currentButton = this.buttons[i];
            if (button === currentButton) {
                this.value = i + 1;
                this.updateRange();
                return;
            }
        }
    }

    evaluateLevel() {
        const index = Math.round(this.levels.length * (this.value / this.buttons.length)) - 1;
        return this.levels[index];
    }

    updateRange = () => {
        let level = this.evaluateLevel();

        for (let i = 0; i < this.buttons.length; i += 1) {
            this.buttons[i].className = 'parameter__button';
            if (this.value - 1 >= i) {
                this.buttons[i].classList.add(level[0])
            }
        }

        if (this.descriptionElement !== null) {
            this.descriptionElement.innerText = level[1];
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const people = new CounterParameter(document.getElementById("people_parameter"));
    const duration = new CounterParameter(document.getElementById("duration_parameter"));
    const fun = new RangeParameter(document.getElementById("fun_parameter"));
})