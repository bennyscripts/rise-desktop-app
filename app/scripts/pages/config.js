const configItemsDiv = document.getElementById('config');

const capatalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

riseConfig.getConfig().then((config) => {
    for (let key in config) {
        if (key === "token" || key === "password") continue;
        let value = config[key];

        let div = document.createElement('div');
        let keyPara = document.createElement('p');
        let valuelabel = document.createElement('label');
        let valueInp = document.createElement('input');

        div.classList.add('config-item');

        keyPara.classList.add('config-key');
        keyPara.innerText = capatalize(key.replaceAll("_", " "));

        valuelabel.classList.add('config-value-wrapper');
        valueInp.classList.add('config-value');
        valueInp.value = value;

        // check if value is a boolean
        if (value === true || value === "true" || value === false || value === "false") {
            valueInp.type = "checkbox";
            valueInp.checked = value;
            valueInp.classList.remove('config-value');
            
            valuelabel.classList.remove('config-value-wrapper');
            valuelabel.classList.add('switch');

            let sliderSpan = document.createElement('span');
            sliderSpan.classList.add('slider');

            valuelabel.appendChild(sliderSpan);
        } else if (key === "token" || key === "password") {
            valueInp.type = "password";
        } else if (typeof(value) == 'number') {
            valueInp.type = "number";
        } else {
            valueInp.type = "text";
        }

        valueInp.addEventListener('change', (event) => {
            if (valueInp.type === "checkbox") {
                riseConfig.set(key, valueInp.checked);
            } else if (valueInp.type === "number") {
                riseConfig.set(key, parseInt(valueInp.value));
            } else {
                riseConfig.set(key, valueInp.value);
            }
        });

        valuelabel.insertBefore(valueInp, valuelabel.firstChild);
        div.appendChild(keyPara);
        div.appendChild(valuelabel);

        configItemsDiv.appendChild(div);
    }
});