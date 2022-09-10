/** @type {HTMLCanvasElement}  */

const canvas = document.getElementById( "canvas" );
const ctx = canvas.getContext( "2d" );

canvas.width = 900;
canvas.height = 600;

const cellSize = 100;

let cellCount = []

let mouse = {
    x: 1,
    y: 1,
    width: 0.1,
    height: 0.1
}
let position = canvas.getBoundingClientRect();
canvas.addEventListener( "mousemove", e =>
{
    mouse.x = e.x
    mouse.y = e.y
} )
canvas.addEventListener( "mouseleave", () =>
{
    mouse.x = undefined
    mouse.y = undefined
} )
class Cell
{
    constructor ( x, y )
    {
        this.x = x
        this.y = y
        //cell-box
        this.box = cellSize
    }
    draw ()
    {
        if ( mouse.x && mouse.y && collision( this, mouse ) )
        {
            ctx.strokeStyle = "black"
            ctx.strokeRect( this.x, this.y, this.box, this.box )
        }
    }
}

function createGrid ()
{
    for ( let y = cellSize; y < canvas.height; y += cellSize )
    {
        for ( let x = 0; x < canvas.width; x += cellSize )
        {
            cellCount.push( new Cell( x, y ) )
        }
    }
}
createGrid();
function drawGrid ()
{
    cellCount.forEach( cell =>
    {
        if ( collision( cell, mouse ) )
        {
            cell.draw()
        }

    } )
}

function animate ()
{
    ctx.clearRect( 0, 0, canvas.width, canvas.height )
    drawGrid()
    ctx.fillStyle = "red"
    ctx.fillRect( 0, 0, canvas.width, cellSize )

    requestAnimationFrame( animate )
}

window.onload = animate

function collision ( a, b )
{
    if (
        !(
            a.x > b.x + b.width ||
            a.x + a.width < b.x ||
            a.y > b.y + b.height ||
            a.y + a.height < b.y
        )
    )
    {
        return true;
    };
};