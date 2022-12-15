var single = [0];
var binary = [0, 0];
var ternary = [0, 0, 0];

function FillTableAnd()
{
    for(let i = 0; i <= binary.length; i++)
    {
        Enumeration(binary, 0, i, "tableAnd", () => binary[0] && binary[1]);
    }
}

function FillTableOr()
{
    for(let i = 0; i <= binary.length; i++)
    {
        Enumeration(binary, 0, i, "tableOr", () => binary[0] || binary[1]);
    }
}

function FillTableNot()
{
    for(let i = 0; i <= single.length; i++)
    {
        Enumeration(single, 0, i, "tableNot", () => (Number)(!single[0]));
    }
}

function FillTableImplication()
{
    for(let i = 0; i <= binary.length; i++)
    {
        Enumeration(binary, 0, i, "tableImplication", () => {if(binary[0]) return binary[1]; else return 1;});
    }
}

function FillTableEquivalent()
{
    for(let i = 0; i <= binary.length; i++)
    {
        Enumeration(binary, 0, i, "tableEquivalent", () => (Number)(binary[0] == binary[1]));
    }
}

function FillTableExclusiveOr()
{
    for(let i = 0; i <= binary.length; i++)
    {
        Enumeration(binary, 0, i, "tableExclusiveOr", () => (Number)(!(binary[0] == binary[1])));
    }
}

function FillTableСonditionalDisjunction()
{
    for(let i = 0; i <= ternary.length; i++)
    {//(B\rightarrow A)\land(\neg B\rightarrow C)
        Enumeration(ternary, 0, i, "tableСonditionalDisjunction", () => {
            if(ternary[1])
            {
                return ternary[0] && 1;
            }
            else
            {
                return ternary[2] && 1;
            };
        });
    }
}

function FillTablePierArrow()
{
    for(let i = 0; i <= binary.length; i++)
    {
        Enumeration(binary, 0, i, "tablePierArrow", () => (Number)(!(binary[0] || binary[1])));
    }
}

function FillTableScheffersStroke()
{
    for(let i = 0; i <= binary.length; i++)
    {
        Enumeration(binary, 0, i, "tableScheffersStroke", () => (Number)(!(binary[0] && binary[1])));
    }
}

function Enumeration(array, startPos, count, tableName, operation)
{
    if(count == 0)
    {
        let tRow = document.createElement("tr");
        let tBody = document.createElement("tbody");
        let cell = document.createElement("td");
        let table = document.getElementsByName(tableName)[0];

        for(let i = 0; i < array.length; i++)
        {
            cell = document.createElement("td");
            cell.appendChild(document.createTextNode(array[i].toString()));
            tRow.appendChild(cell);
        }

        cell = document.createElement("td");
        cell.appendChild(document.createTextNode(operation()));
        tRow.appendChild(cell);
        tBody.appendChild(tRow);
        table.appendChild(tBody);
    }
    else
    {
        for(let i = startPos; i < array.length - count + 1; i++)
        {
            array[i] = 1;
            Enumeration(array, i + 1, count - 1, tableName, operation);
            array[i] = 0;
        }
    }
}

FillTableAnd();
FillTableOr();
FillTableNot();
FillTableImplication();
FillTableEquivalent();
FillTableExclusiveOr();
FillTableСonditionalDisjunction();
FillTablePierArrow();
FillTableScheffersStroke();