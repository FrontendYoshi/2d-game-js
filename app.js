//ich betitel das ganze als app (das app nach dem const) und sage was ich in der  Variablen speichern möchte 
//(hier: Pixi.Application, ein JS Framework die Standardfunktionen schon hat)
const app = new PIXI.Application();
// Raketenbild  hinzufügen
const rocket = PIXI.Sprite.from('Assets/rocket.png');
app.stage.addChild(rocket);
// Rakete platzieren, indem ich die x und y Koordinate auf irgendetwas sende
rocket.x = 350;
rocket.y = 520;
// skalierung der x Koordinate verändern, sodass die Rakete kleiner aussieht
rocket.scale.x = 0.05;
// skalierung der x Koordinate verändern,sodass die Rakete kleiner aussieht
rocket.scale.y = 0.05;
//Objektliste durch einen Array erstellen
const ufolist=[]
// diese Applikation zu meinem Spiel hinzufügen.
document.body.appendChild(app.view);



//Intervall erstellen, damit diese Funktion nicht nur einmal ausgeführt wird, sondern regelmäßig
gameInterval(function () {
    const ufo = PIXI.Sprite.from('Assets/ufo1.png');
    ufo.x = random(0, 700); // x Koordinate soll zufällig sein
    ufo.y = 25;
    ufo.scale.x = 0.1;
    ufo.scale.y = 0.1;
    app.stage.addChild(ufo);
    ufolist.push(ufo); 
    // ufo nach unten fliegen lassen
    flyDown(ufo, 1);// die 1 steht für die Geschwindigkeit
    // wenn die Rakete mit dem Ufo kollidiert ist das Spiel zuende
    waitForCollision(ufo, rocket).then(function () {
        app.stage.removeChild(rocket); // bei Kollision Rakete entfernen
        stopGame();
    });
}, 1000);

//wenn ich die linke Taste drücke wird der x Koordinate etwas neues zugewiesen
//(hier: die alte x Koordinate minus 5)
function leftKeyPressed() {
    rocket.x = rocket.x - 5;
}
//wenn ich die rechte Taste drücke wird der x Koordinate etwas neues zugewiesen
//(hier: die alte x Koordinate plus 5)
function rightKeyPressed() {
    rocket.x = rocket.x + 5;
}

//wenn ich die Leertaste drücke, kann ich mit der Rakete schießen
function spaceKeyPressed(){
    const bullet = PIXI.Sprite.from('Assets/bullet.png');
    bullet.x = rocket.x+13; // x Koordinate soll da sein wo die x Koordinate meiner Rakete sein
    bullet.y = 500;// y Koordinate soll da sein wo die y Koordinate meiner Rakete sein
    bullet.scale.x = 0.02;
    bullet.scale.y = 0.02;
    flyUp(bullet); // Kugel nach oben fliegen lassen
    app.stage.addChild(bullet);

    waitForCollision(bullet, ufolist).then(function ([bullet, ufo]) {
        app.stage.removeChild(ufolist);
        app.stage.removeChild(bullet); // bei Kollision Kugel entfernen
        stopGame ();
    });
}

