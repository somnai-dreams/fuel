createLandscape({
    //  palleteImage:'img/pallete5.png'
})

function createLandscape(params) {

    var container = document.querySelector(".landscape")
    var width = window.innerWidth;
    var height = window.innerHeight;

    var scene, renderer, camera;
    var terrain;
    var curveNew;
    var be;
    var curveObject;
    var cylinder1;
    var cylinder2;
    var jet;
    var t = 0;
    var ogPozX;
    var ogPozY;
    var ogRotX;
    var ogRotY;
    var ogRotXJet;
    var ogRotYJet;
    var jetObj;
    var loader = new THREE.OBJLoader();


    var raycaster = new THREE.Raycaster();
    var mouse2 = new THREE.Vector2();

    var mouse = {
        x: 0,
        y: 0,
        xDamped: 0,
        yDamped: 0
    };
    var isMobile = typeof window.orientation !== 'undefined'


    function onMousedown(event) {

        mouse2.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse2.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse2, camera);

        var intersects = raycaster.intersectObject(be);

//        if (intersects.length > 0) {
//            console.log('success')
//            success();
//        } else {
//            console.log('you suck');
//            fail();
//        }

        if ((jetObj.position.x-1 < be.position.x) && (be.position.x < jetObj.position.x+1) && (jetObj.position.y+2-1 < be.position.y) && (be.position.y < jetObj.position.y+2+1)){
             console.log('success')
            success();
             console.log('target pos :'+ be.position.x, be.position.y);
        }else {
            console.log('you suck');
            fail();
             
             console.log(be.position.x - jetObj.position.x, (be.position.y - (jetObj.position.y+2)));
        }

    }

    init();

    function init() {

        sceneSetup();
        sceneElements();
        sceneTextures();
        render();

        if (isMobile)
            window.addEventListener("touchmove", onInputMove, {
                passive: false
            })
        else
            window.addEventListener("mousemove", onInputMove)

        window.addEventListener('mousedown', onMousedown, false);


        window.addEventListener("resize", resize)
        resize()
    }

    function sceneSetup() {
        scene = new THREE.Scene();
        var fogColor = new THREE.Color(0xffffff)
        scene.background = fogColor;
        scene.fog = new THREE.Fog(fogColor, 10, 200);

        //    sky()

        camera = new THREE.PerspectiveCamera(50, width / height, .1, 10000);
        camera.position.y = 10;
        camera.position.z = 4;
        ogPozX = camera.position.x;
        ogPozY = camera.position.y;
        ogRotX = camera.rotation.x;
        ogRotY = camera.rotation.y;

        ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight)

        var geometry = new THREE.SphereGeometry(600, 100, 100);
        var material = new THREE.MeshLambertMaterial({
//            color: 0xc91010
            color: 0xffffff
        });
        var i = new THREE.Mesh(geometry, material);
        i.position.z = -800;

        var geometry = new THREE.SphereGeometry(2, 20, 20);
        var material3 = new THREE.MeshLambertMaterial({
            color: 0xfabb2c
        });
        var material4 = new THREE.MeshBasicMaterial({
            color: 0x000000
        });
                var material2 = new THREE.LineBasicMaterial({
            color: 0x31d062,
        });
        
        material2.depthTest = false;
        
        
        
        material4.name = "jetColor";
        material3.depthTest = false;
        be = new THREE.Mesh(geometry, material3);
        be.renderOrder = 20;
        be.name = "target";
        be.position.z = -100;
        scene.add(be);

        loader.load('jet.obj',
            function (object) {
                scene.add(object);
                object.name = "jet";
                jetObj = object.children[0];
                jetObj.material = material4;
                jetObj.scale.set(0.04, 0.04, 0.04);
                jetObj.position.set(0, 8, -100);
                jetObj.rotation.x = Math.PI / 2;
//                jetObj.rotation.z = Math.PI /1;
                ogRotXjet = jetObj.rotation.x;
                ogRotYjet = jetObj.rotation.y;
            }
        );

        var pointArray = [];

        var NUM_POINTS = 10;

//        for (var i = 0; i < NUM_POINTS; i++) {
//            var x = Math.random() * (10 - -10) - 10;
//            var y = (Math.random() * (5 - -5) -5)+14.5;
//            var z = Math.random() * (-37 - -33) - 33;
//            var dotGeometry = new THREE.Vector3(x, y, z);
//            pointArray.push(dotGeometry);
//        };
//        
         for (var i = 0; i < NUM_POINTS; i++) {
            var x = Math.random() * (1 - -1) - 1;
            var y = (Math.random() * (1 - -1) -1)+12;
            var z = -100;
            var dotGeometry = new THREE.Vector3(x, y, z);
            pointArray.push(dotGeometry);
        };


        //Create a closed wavey loop
        curveNew = new THREE.CatmullRomCurve3(pointArray, true, "catmullrom", 3);

        var points = curveNew.getPoints(1000);
        var geometry2 = new THREE.BufferGeometry().setFromPoints(points);
        var splineObject = new THREE.Line( geometry2, material2 );
        splineObject.renderOrder = 21;
        scene.add(splineObject);
        


        
        
        var geometry = new THREE.CylinderGeometry( 0.2, 0.2, 300, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var cylinder = new THREE.Mesh( geometry, material2 );
        cylinder.position.set(0, 10, -100);
        cylinder.renderOrder = 21;
//        scene.add( cylinder );
        
        var cylinder = new THREE.Mesh( geometry, material2 );
        cylinder.position.set(0, 10, -100);
        cylinder.rotation.z = Math.PI / 2;
        cylinder.renderOrder = 21;
//        scene.add( cylinder );
        
        var geometry = new THREE.CylinderGeometry( 0.2, 0.2, 5, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        cylinder1 = new THREE.Mesh( geometry, material3 );
        cylinder1.position.set(0, 10, -100);
        cylinder1.renderOrder = 22;
        scene.add( cylinder1 );
        
        cylinder2 = new THREE.Mesh( geometry, material3 );
        cylinder2.position.set(0, 10, -100);
        cylinder2.rotation.z = Math.PI / 2;
        cylinder2.renderOrder = 22;
        scene.add( cylinder2 );
        

        // Create the final object to add to the scene
        var curveObject = new THREE.Line(geometry2, material2);
//        scene.add(curveObject);

        
        var fuelLine = [ new THREE.Vector3(0, 0, 0),  new THREE.Vector3(2, 2, -20), new THREE.Vector3(5, 5, -50)];       
        var curveNew2 = new THREE.CatmullRomCurve3(fuelLine, true, "catmullrom", 3);
        var points2 = curveNew2.getPoints(500);
        var geometry3 = new THREE.BufferGeometry().setFromPoints(points2);

       

        // Create the final object to add to the scene
        var curveObject2 = new THREE.Line(geometry3, material2);
//                          scene.add(curveObject2);


        var curve3 = new THREE.CatmullRomCurve3( [
            new THREE.Vector3(-300, 10, -100),
            new THREE.Vector3(300, 10, -100)
        ] );
        var points3 = curve3.getPoints( 1 );
        var geometry5 = new THREE.BufferGeometry().setFromPoints( points3 );
        var splineObject = new THREE.Line( geometry5, material2 );
        splineObject.renderOrder = 20;
//        scene.add(splineObject);
        
        var curve3 = new THREE.CatmullRomCurve3( [
            new THREE.Vector3(0, -300, -100),
            new THREE.Vector3(0, 300, -100)
        ] );
        var points3 = curve3.getPoints( 1 );
        var geometry5 = new THREE.BufferGeometry().setFromPoints( points3 );
        var splineObject = new THREE.Line( geometry5, material2 );
        splineObject.renderOrder = 20;
//        scene.add(splineObject);
        


        

        renderer = new THREE.WebGLRenderer({
            canvas: container,
            antialias: true
        });
        renderer.setPixelRatio = devicePixelRatio;
        renderer.setSize(width, height);


    }



    function sceneElements() {

        var geometry = new THREE.PlaneBufferGeometry(100, 400, 400, 400);

        var uniforms = {
            time: {
                type: "f",
                value: 0.0
            },
            distortCenter: {
                type: "f",
                value: 0.1
            },
            roadWidth: {
                type: "f",
                value: 0.5
            },
            pallete: {
                type: "t",
                value: null
            },
            speed: {
                type: "f",
                value: 0.5
            },
            maxHeight: {
                type: "f",
                value: 10.0
            },
            color: new THREE.Color(1, 1, 1)
        }

        var material = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([THREE.ShaderLib.basic.uniforms, uniforms]),
            vertexShader: document.getElementById('custom-vertex').textContent,
            fragmentShader: document.getElementById('custom-fragment').textContent,
            wireframe: false,
            fog: true
        });

        terrain = new THREE.Mesh(geometry, material);
        terrain.position.z = -180;
        terrain.rotation.x = -Math.PI / 2;
        terrain.name = "terrain";

        scene.add(terrain)


    }

    function sceneTextures() {
        // pallete
        new THREE.TextureLoader().load(params.palleteImage, function (texture) {
            terrain.material.uniforms.pallete.value = texture;
            terrain.material.needsUpdate = true;
        });
    }

    function sky() {
        sky = new THREE.Sky();
        sky.scale.setScalar(450000);
        sky.material.uniforms.turbidity.value = 20;
        sky.material.uniforms.rayleigh.value = 0;
        sky.material.uniforms.luminance.value = 1;
        sky.material.uniforms.mieCoefficient.value = 0.01;
        sky.material.uniforms.mieDirectionalG.value = 0.8;

        scene.add(sky);

        sunSphere = new THREE.Mesh(
            new THREE.SphereBufferGeometry(20000, 16, 8),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })
        );
        sunSphere.visible = false;
        scene.add(sunSphere);

        var theta = Math.PI * (-0.02);
        var phi = 2 * Math.PI * (-.25);

        sunSphere.position.x = 400000 * Math.cos(phi);
        sunSphere.position.y = 400000 * Math.sin(phi) * Math.sin(theta);
        sunSphere.position.z = 400000 * Math.sin(phi) * Math.cos(theta);

        sky.material.uniforms.sunPosition.value.copy(sunSphere.position);
    }

    function resize() {
        width = window.innerWidth
        height = window.innerHeight
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    function onInputMove(e) {
        
        e.preventDefault();

        var x, y
        if (e.type == "mousemove") {
            x = e.clientX;
            y = e.clientY;
        } else {
            x = e.changedTouches[0].clientX
            y = e.changedTouches[0].clientY
        }

        mouse.x = x;
        mouse.y = y;
        

    }

    //    jet = scene.children[3];

    function render() {
        requestAnimationFrame(render)
        
        

        // damping mouse for smoother interaction
        mouse.xDamped = lerp(mouse.xDamped, mouse.x, 0.05);
        mouse.yDamped = lerp(mouse.yDamped, mouse.y, 0.05);

        var time = performance.now() * 0.01;
        terrain.material.uniforms.time.value = time*-1;
        terrain.material.uniforms.distortCenter.value = map(mouse.xDamped, 0, width, -0.1, 0.1);
        terrain.material.uniforms.roadWidth.value = map(mouse.yDamped, 0, height, -0.5, 2.5);


        camera.rotation.y =  map(mouse.xDamped, 0, width, ogRotX-0.1, ogRotX+0.1) * -1;
        camera.rotation.x =  map(mouse.yDamped, 0, height, ogRotY-0.1, ogRotY+0.1) * -1;
        camera.rotation.z =  map(mouse.xDamped, 0, width, ogRotX-0.1, ogRotX+0.1) * -1;
        
        
        t += 0.0012;
        var pos = curveNew.getPoint(t);
        
//        be.position.copy(pos);
//        be.position.copy(pos);
        
//        be.position.y = map(mouse.yDamped, 0, height, pos.y+25, pos.y-05);
//        be.position.x = map(mouse.xDamped, 0, width, pos.x-30, pos.x+30);
        be.position.y = map(mouse.yDamped, 0, height, pos.y+25, pos.y-05);
        be.position.x = map(mouse.xDamped, 0, width, pos.x-30, pos.x+30);
        cylinder2.position.y = map(mouse.yDamped, 0, height, pos.y+25, pos.y-05);
        cylinder1.position.x = map(mouse.xDamped, 0, width, pos.x-30, pos.x+30);
//        cylinder2.position.y = map(mouse.y, 0, height, +40, -20);
//        cylinder1.position.x = map(mouse.x, 0, width, -30, +30);
        
        if (!!jetObj) {
//            jetObj.position.y = map(mouse.yDamped, 0, height, 9, 11);
//            jetObj.position.x = map(mouse.xDamped, 0, width, -1, 1);
            jetObj.rotation.y = map(mouse.xDamped, 0, width, ogRotYjet-0.5, ogRotYjet+0.5) ;
            jetObj.rotation.x = map(mouse.yDamped, 0, height, ogRotXjet-0.1, ogRotXjet+0.1) * -1;
            
            
        }

       
//        console.log('Jet pos :'+ jetObj.position.x, jetObj.position.y);
//        console.log('target pos :'+ be.position.x, be.position.y);



        renderer.render(scene, camera)

    }

    function map(value, start1, stop1, start2, stop2) {
        return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
    }

    function lerp(start, end, amt) {
        return (1 - amt) * start + amt * end
    }
}

const getRandomNumber = (min, max) => (Math.random() * (max - min) + min);

animateTitles();

function animateTitles() {
    const overlay = document.querySelector('.overlay');
    const title = document.querySelector('.content__title');
    charming(title);
    const titleLetters = Array.from(title.querySelectorAll('span'));

    TweenMax.to(overlay, 2, {
        ease: Quad.easeOut,
        opacity: 0
    });

    TweenMax.set(titleLetters, {
        opacity: 0
    });
    TweenMax.staggerTo(titleLetters, 1.5, {
        ease: Expo.easeOut,
        startAt: {
            rotationX: -100,
            z: -1000
        },
        opacity: 1,
        rotationX: 0,
        z: 0
    }, 0.1);

    const subtitle = document.querySelector('.content__subtitle');
    TweenMax.set(subtitle, {
        opacity: 0
    });
    TweenMax.to(subtitle, 1.5, {
        ease: Expo.easeOut,
        startAt: {
            y: 30
        },
        opacity: 1,
        y: 0
    });

    const glitch = (el, cycles) => {
        if (cycles === 0 || cycles > 3) return;
        TweenMax.set(el, {
            x: getRandomNumber(-20, 20),
            y: getRandomNumber(-20, 20),
            color: ['#95dc77', '#f3eb8a', '#f9b97f'][cycles - 1]
        });
        setTimeout(() => {
            TweenMax.set(el, {
                x: 0,
                y: 0,
                color: '#fff'
            });
            glitch(el, cycles - 1);
        }, getRandomNumber(20, 100));
    };

    const loop = (startAt) => {
        this.timeout = setTimeout(() => {
            const titleLettersShuffled = titleLetters.sort((a, b) => 0.5 - Math.random());
            const lettersSet = titleLettersShuffled.slice(0, getRandomNumber(1, titleLetters.length + 1));
            for (let i = 0, len = lettersSet.length; i < len - 1; ++i) {
                glitch(lettersSet[i], 3);
            }
            loop();
        }, startAt || getRandomNumber(500, 3000));
    }
    loop(1500);
}

fail();

function success() {

    document.getElementById('content__title').style.display = 'block';
}

function fail() {

    document.getElementById('content__title').style.display = 'none';
}