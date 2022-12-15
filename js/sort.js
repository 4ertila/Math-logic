let array;

function Sort()
{
    document.querySelector("#steps").innerHTML = "";
    PostArray(array, []);
    let sorts = document.querySelector('#sortList').getElementsByTagName('option');
    let sortName;
    for (let i = 0; i < sorts.length; i++) 
    {
        if (sorts[i].selected == true)
        {
            sortName = sorts[i].value;
            break;
        }
    }

    switch(sortName)
    {
        case "bubbleSort":
            BubbleSort();
            break;

        case "insertionSort":
            InsertionSort();
            break;

        case "selectionSort":
            SelectionSort();
            break;

        case "simpleCountingSort":
            SimpleCountingSort();
            break;
    }
}

function SimpleCountingSort()
{   
    let count = [];
    let sortedArray = [];
    let id = [];
    for (let i = 0; i < array.length; i++) 
    {
        count[i] = 0;
        id[i] = i;
    }
    for (let i = 0; i < array.length - 1; i++)
    { 
        for (let j = i + 1; j < array.length; j++)
        { 
            if (array[i] < array[j]) 
            {
                count[j]++;
            }
            else 
            {
                count[i]++;
            }
        }
    }

    for (let i = 0; i < array.length; i++) 
    {
        sortedArray[count[i]] = array[i];
    }
    
    PostArray(count, id);
    PostArray(sortedArray, []);
}

function SelectionSort()
{
    let copyArray = array.slice(0);
    let minID;
    let min;
    let tValue;
    for (let i = 0; i < copyArray.length; i++)
    {
        min = copyArray[i];
        minID = i;
        for (let j = i + 1; j < copyArray.length; j++)
        {
            if (copyArray[j] <= min)
            {
                min = copyArray[j];
                minID = j;
            }
        }

        PostArray(copyArray, [minID, i]);

        tValue = copyArray[i];
        copyArray[i] = min;
        copyArray[minID] = tValue;

        PostArray(copyArray, [minID, i]);
        PostArray(copyArray, []);
    }
}

function InsertionSort()
{
    let copyArray = array.slice(0);
    let tValue;

    for (let i = 1; i < copyArray.length; i++)
    {
        tValue = copyArray[i];
        for (let j = i - 1; j >= 0; j--)
        {
            PostArray(copyArray, [j, j + 1]);

            if (tValue >= copyArray[j])
            {
                copyArray[j + 1] = tValue;
                PostArray(copyArray, []);
                break;
            }
            copyArray[j + 1] = copyArray[j];
            copyArray[j] = tValue;

            PostArray(copyArray, [j, j + 1]);
            PostArray(copyArray, []);
        }
    }
}

function BubbleSort()
{
    let copyArray = array.slice(0);
    let tValue;

    for (let i = copyArray.length - 1; i > 0; i--)
    {
        for (let j = 0; j < i; j++)
        {
            PostArray(copyArray, [j, j + 1]);

            if (array[j] > copyArray[j + 1])
            {
                tValue = copyArray[j + 1];
                copyArray[j + 1] = copyArray[j];
                copyArray[j] = tValue;
                PostArray(copyArray, [j, j + 1]);
            }

            PostArray(copyArray, []);
        }
    }
}

function PostArray(array, id)
{
    let str = "";
    let step = document.createElement("li");
    for(let i = 0; i < array.length; i++)
    {
        if(id.includes(i))
        {
            step.innerHTML += str;
            let redText = document.createElement("span");
            redText.className = "redText";
            redText.innerHTML = array[i].toString() + " ";
            step.appendChild(redText);
            str = "";
        }
        else
        {
            str += array[i].toString() + " ";
        }
    }

    step.innerHTML += str;
    document.querySelector("#steps").appendChild(step);
}

function Generate()
{
    document.querySelector("#steps").innerHTML = "";
    array = Array.from({length: 10}, () => Math.floor(Math.random() * 20));   
    PostArray(array, []);
}

window.onload = () => {
    document.querySelector('#generate').onclick = Generate;
    document.querySelector('#sort').onclick = Sort;
}