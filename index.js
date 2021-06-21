function createPage(){
    const main = document.querySelector('#main');
    createResetButton();
    createDrawingGrid();
}

function createResetButton(){
    let resetButton = document.createElement('button');
    resetButton.innerHTML='RESET';
    resetButton.type = 'submit';
    resetButton.onclick= function (){
        resetDrawingGrid();
    }
    main.appendChild(resetButton);
}

function createDrawingGrid(){
    for(let i = 0; i < maxDimensions; i++){
        const row = document.createElement('div');
        row.classList = "row";
        for(let i = 0; i < maxDimensions; i++){
            const item = document.createElement('div');
            item.classList = "item";
            row.appendChild(item);
        }
        main.appendChild(row);
    }
    changeColorOnHover();
}

function changeColorOnHover(){
    const allItems = document.querySelectorAll('.item');
    allItems.forEach(item => {
        item.addEventListener('mouseenter', changeColor);
    });
}

function changeColor(){
    this.classList.add('modified');
}

function resetDrawingGrid(){
    maxDimensions = Number(window.prompt("Enter new size from 1-64"));
    if(!maxDimensions || maxDimensions < 1 || maxDimensions > 64) {
        resetDrawingGrid();
    }
    while(main.firstChild){
        main.removeChild(main.firstChild);
    }
    createResetButton();
    createDrawingGrid();
}


let maxDimensions = 64;
createPage();
