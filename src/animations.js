import gsap from "gsap";

export function sv3Ani(startWithRandomRot) {
  return (meshObj) => {
    /**
     * This function is being called by the Mesh component when starting animation
     * via componentReference.startAni() or when prop 'aniauto' is provided (true)
     */

    let ani = {
      timestamp: {},
      tl1: {},
      tl2: {},
      rAF: 0,
      durMove: 2,
      doRotate: false
    };

    function onStart() {
      //can also be empty, but usually you put some logic in here or call a function
      ani.timestamp = performance.now();

      startWithRandomRot
        ? ((meshObj.rotation.x = Math.random() * 6.28319),
          (meshObj.rotation.y = Math.random() * 6.28319),
          (meshObj.rotation.z = Math.random() * 6.28319))
        : null;

      meshObj.position.y = -0.65;

      ani.tl1 = gsap.timeline({ repeat: -1 });

      ani.tl1
        .to(meshObj.position, {
          duration: ani.durMove,
          x: 0.8,
          ease: "sine.inOut",
        })
        .to(meshObj.position, {
          duration: ani.durMove,
          x: -0.8,
          ease: "sine.inOut",
        })
        .to(meshObj.position, {
          duration: ani.durMove,
          x: 0,
          ease: "sine.inOut",
        });

      // startJumping();
      startRotating();
    }

    function onStop() {
      //console.log("animation : onStop!");
      //E.g. stop animations
      pause();
    }

    function startJumping() {
      ani.tl2 = gsap.timeline({ repeat: -1 });

      ani.tl2
        .to(meshObj.position, {
          duration: ani.durMove * 0.25,
          y: 0.65,
          ease: "power2.out",
        })
        .to(meshObj.position, {
          duration: ani.durMove * 0.25,
          y: -0.65,
          ease: "power2.in",
        });
    }

    /**
     * Any additonal animation logic you can also call by componentReference.getAnimation().foo()
     */

    function startRotating() {
      ani.doRotate = false;
      rotate();
    }

    function rotate() {
      //console.log(aniVars.timestamp)
      meshObj.rotation.x += 0.02;
      meshObj.rotation.y += 0.02;
      meshObj.rotation.z += 0.02;

      if (ani.doRotate) {
        ani.rAF = requestAnimationFrame(rotate);
      }
    }

    function stopRotating() {
      //console.log("animation : stopRotating")
      ani.doRotate = false;
      cancelAnimationFrame(ani.rAF);
    }

    //Optional, can be implemented for performance reasons when using multiple scenes
    function onSceneDeactivated() {
      //console.log("animation : onSceneDeactivated");
      //E.g. stop animations
      pause();
    }

    function onSceneReactivated() {
      //console.log("animation : onSceneReactivated");
      //E.g. resume animations
      resume();
    }

    function pause() {
      ani.tl1.pause();
      ani.tl2.pause();
      stopRotating();
    }

    function resume() {
      ani.tl1.resume();
      ani.tl2.resume();
      startRotating();
    }

    //Has to be implemented
    function onDestroy() {
      /*  
      console.log("animation : onDestroy", {
        tl1: ani.tl1,
        tl2: ani.tl2,
        rAF: ani.rAF,
      });
      */

      if (ani.tl1) {
        ani.tl1.kill();
      }
      if (ani.tl2) {
        ani.tl2.kill();
      }
      stopRotating();
    }

    return {
      aniVars: ani,
      onStart: onStart,
      onStop: onStop,
      pause: pause,
      resume: resume,
      startRotating: startRotating,
      stopRotating: stopRotating,
      rotate: rotate,
      onSceneDeactivated: onSceneDeactivated,
      onSceneReactivated: onSceneReactivated,
      onDestroy: onDestroy,
    };
  };
}
