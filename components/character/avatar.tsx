"use client";

import { useAvatar } from "@/hooks/useAvatar";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// import { useChat } from "@/hooks/useChat";

const facialExpressions: { [key: string]: { [key: string]: number } } = {
  default: {},
  smile: {
    browInnerUp: 0.17,
    eyeSquintLeft: 0.4,
    eyeSquintRight: 0.44,
    noseSneerLeft: 0.1700000727403593,
    noseSneerRight: 0.14000002836874015,
    mouthPressLeft: 0.61,
    mouthPressRight: 0.41000000000000003,
  },
  funnyFace: {
    jawLeft: 0.63,
    mouthPucker: 0.53,
    noseSneerLeft: 1,
    noseSneerRight: 0.39,
    mouthLeft: 1,
    eyeLookUpLeft: 1,
    eyeLookUpRight: 1,
    cheekPuff: 0.9999924982764238,
    mouthDimpleLeft: 0.414743888682652,
    mouthRollLower: 0.32,
    mouthSmileLeft: 0.35499733688813034,
    mouthSmileRight: 0.35499733688813034,
  },
  sad: {
    mouthFrownLeft: 1,
    mouthFrownRight: 1,
    mouthShrugLower: 0.78341,
    browInnerUp: 0.452,
    eyeSquintLeft: 0.72,
    eyeSquintRight: 0.75,
    eyeLookDownLeft: 0.5,
    eyeLookDownRight: 0.5,
    jawForward: 1,
  },
  surprised: {
    browOuterUpLeft: 0.5,
    browOuterUpRight: 0.5,
    browInnerUp: 0.6,
    eyeWideLeft: 0.8,
    eyeWideRight: 0.8,
    jawOpen: 0.7,
  },
  angry: {
    browDownLeft: 1,
    browDownRight: 1,
    eyeSquintLeft: 1,
    eyeSquintRight: 1,
    jawForward: 1,
    jawLeft: 1,
    mouthShrugLower: 1,
    noseSneerLeft: 1,
    noseSneerRight: 0.42,
    eyeLookDownLeft: 0.16,
    eyeLookDownRight: 0.16,
    cheekSquintLeft: 1,
    cheekSquintRight: 1,
    mouthClose: 0.23,
    mouthFunnel: 0.63,
    mouthDimpleRight: 1,
  },
  crazy: {
    browInnerUp: 0.9,
    jawForward: 1,
    noseSneerLeft: 0.5700000000000001,
    noseSneerRight: 0.51,
    eyeLookDownLeft: 0.39435766259644545,
    eyeLookUpRight: 0.4039761421719682,
    eyeLookInLeft: 0.9618479575523053,
    eyeLookInRight: 0.9618479575523053,
    jawOpen: 0.9618479575523053,
    mouthDimpleLeft: 0.9618479575523053,
    mouthDimpleRight: 0.9618479575523053,
    mouthStretchLeft: 0.27893590769016857,
    mouthStretchRight: 0.2885543872656917,
    mouthSmileLeft: 0.5578718153803371,
    mouthSmileRight: 0.38473918302092225,
    tongueOut: 0.9618479575523053,
  },
};

const corresponding: { [key: string]: string } = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

let setupMode = false;

interface AvatarProps {
  [key: string]: any;
}

export function Avatar(props: AvatarProps) {
  const { nodes, materials, scene } = useGLTF(
    "/models/doctor-model.glb"
  ) as any;

  // const { message, onMessagePlayed, chat } = useChat();

  // const [lipsync, setLipsync] = useState<any>();
  const { lipsync, setLipsync, audio, setAudio, play, setPlay, path, setPath } =
    useAvatar((state) => state);

  const [blink, setBlink] = useState(false);
  const [winkLeft, setWinkLeft] = useState(false);
  const [winkRight, setWinkRight] = useState(false);
  const [facialExpression, setFacialExpression] = useState("");
  // const [audio, setAudio] = useState<HTMLAudioElement | undefined>();

  // useEffect(() => {
  //   console.log(message);
  //   if (!message) {
  //     setAnimation("Breathing Idle");
  //     return;
  //   }
  //   setAnimation(message.animation);
  //   setFacialExpression(message.facialExpression);
  //   setLipsync(message.lipsync);
  //   const audio = new Audio("data:audio/mp3;base64," + message.audio);
  //   audio.play();
  //   setAudio(audio);
  //   audio.onended = onMessagePlayed;
  // }, [message, onMessagePlayed]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!path) return;
    console.log("path", `/sounds/${path}.mp3`);

    // Buat instance Audio baru dan simpan dalam ref
    const audio = new Audio(`/sounds/${path}.mp3`);
    audioRef.current = audio;

    // Mainkan audio
    audio
      .play()
      .then(() => {
        console.log(`Audio ${path} is playing`);
      })
      .catch((error) => {
        console.error(`Failed to play the audio ${path}:`, error);
      });

    // Event listener untuk menghapus audio ketika selesai diputar
    const handleEnded = () => {
      console.log(`Audio ${path} has ended`);
      audioRef.current = null;
    };

    audio.addEventListener("ended", handleEnded);

    // Fetch lipsync JSON file
    fetch(`/rhubarb-json/${path}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLipsync(data);
      })
      .catch((error) => {
        console.error(`Failed to fetch JSON for ${path}:`, error);
      });

    // Cleanup function: Hapus audio jika path berubah atau component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        // setPath(undefined);
        console.log(`Audio ${path} was stopped and cleaned up`);
      }
      audio.removeEventListener("ended", handleEnded);
    };
  }, [path]);

  // useEffect(() => {
  //   const audio = new Audio(`/sounds/${path}.mp3`);
  //   audio
  //     .play()
  //     .then(() => {
  //       console.log("Audio is playing");
  //     })
  //     .catch((error) => {
  //       console.error("Failed to play the audio:", error);
  //     });

  //   fetch(`/rhubarb-json/${path}.json`)
  //     .then((response) => {
  //       response.json().then((data) => {
  //         setLipsync(data);
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch JSON:", error);
  //     });

  //   return () => {
  //     // setPlay(false);
  //     // setPath("");
  //   };
  // }, [play]);

  const { animations } = useGLTF("/models/doctor-animations.glb") as any;

  const group = useRef<THREE.Group>(null);
  const { actions, mixer } = useAnimations(animations, group);
  const [animation, setAnimation] = useState(
    animations.find((a: any) => a.name === "Breathing Idle")
      ? "Breathing Idle"
      : animations[0].name // Check if Idle animation exists otherwise use first animation
  );

  // useEffect(() => {
  //   actions[animation]
  //     .reset()
  //     .fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
  //     .play();
  //   return () => actions[animation].fadeOut(0.5);
  // }, [animation]);

  // useEffect(() => {
  //   if (actions[animation]) {
  //     actions[animation]
  //       .reset()
  //       .fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
  //       .play();
  //   }
  //   return () => {
  //     if (actions[animation]) {
  //       actions[animation].fadeOut(0.5);
  //     }
  //   };
  // }, [animation]);

  useEffect(() => {
    const action = actions[animation]?.reset();
    const isAnyActionPlaying = mixer.existingAction(animation)?.isRunning();
    if (action) action.fadeIn(isAnyActionPlaying ? 0.5 : 0).play();

    return () => {
      if (action) action.fadeOut(0.5);
    };
  }, [actions, animation, mixer]);

  const lerpMorphTarget = (
    target: string,
    value: number,
    speed: number = 0.1
  ) => {
    scene.traverse((child: any) => {
      if (child.isSkinnedMesh && child.morphTargetDictionary) {
        const index = child.morphTargetDictionary[target];
        if (
          index === undefined ||
          child.morphTargetInfluences[index] === undefined
        ) {
          return;
        }
        child.morphTargetInfluences[index] = THREE.MathUtils.lerp(
          child.morphTargetInfluences[index],
          value,
          speed
        );

        // if (!setupMode) {
        //   try {
        //     set({
        //       [target]: value,
        //     });
        //   } catch (e) {}
        // }
      }
    });
  };

  useFrame(() => {
    !setupMode &&
      Object.keys(nodes.EyeLeft.morphTargetDictionary).forEach((key) => {
        const mapping = facialExpressions[facialExpression];
        if (key === "eyeBlinkLeft" || key === "eyeBlinkRight") {
          return; // eyes wink/blink are handled separately
        }
        if (mapping && mapping[key]) {
          lerpMorphTarget(key, mapping[key], 0.1);
        } else {
          lerpMorphTarget(key, 0, 0.1);
        }
      });

    lerpMorphTarget("eyeBlinkLeft", blink || winkLeft ? 1 : 0, 0.5);
    lerpMorphTarget("eyeBlinkRight", blink || winkRight ? 1 : 0, 0.5);

    // LIPSYNC
    if (setupMode) {
      return;
    }

    const appliedMorphTargets: string[] = [];
    if (lipsync) {
      const currentAudioTime = audioRef.current?.currentTime || 0;
      for (let i = 0; i < lipsync.mouthCues.length; i++) {
        const mouthCue = lipsync.mouthCues[i];
        if (
          currentAudioTime >= mouthCue.start &&
          currentAudioTime <= mouthCue.end
        ) {
          appliedMorphTargets.push(corresponding[mouthCue.value]);
          lerpMorphTarget(corresponding[mouthCue.value], 1, 0.2);
          break;
        }
      }
    }

    Object.values(corresponding).forEach((value) => {
      if (appliedMorphTargets.includes(value)) {
        return;
      }
      lerpMorphTarget(value, 0, 0.1);
    });
  });

  // useControls("FacialExpressions", {
  //   // chat: button(() => chat("")),
  //   winkLeft: button(() => {
  //     setWinkLeft(true);
  //     setTimeout(() => setWinkLeft(false), 300);
  //   }),
  //   winkRight: button(() => {
  //     setWinkRight(true);
  //     setTimeout(() => setWinkRight(false), 300);
  //   }),
  //   animation: {
  //     value: animation,
  //     options: animations.map((a: any) => a.name),
  //     onChange: (value: string) => setAnimation(value),
  //   },
  //   facialExpression: {
  //     options: Object.keys(facialExpressions),
  //     onChange: (value: string) => setFacialExpression(value),
  //   },
  //   enableSetupMode: button(() => {
  //     setupMode = true;
  //   }),
  //   disableSetupMode: button(() => {
  //     setupMode = false;
  //   }),
  //   logMorphTargetValues: button(() => {
  //     const emotionValues: { [key: string]: number } = {};
  //     Object.keys(nodes.EyeLeft.morphTargetDictionary).forEach((key) => {
  //       if (key === "eyeBlinkLeft" || key === "eyeBlinkRight") {
  //         return; // eyes wink/blink are handled separately
  //       }
  //       const value =
  //         nodes.EyeLeft.morphTargetInfluences[
  //           nodes.EyeLeft.morphTargetDictionary[key]
  //         ];
  //       if (value > 0.01) {
  //         emotionValues[key] = value;
  //       }
  //     });
  //     console.log(JSON.stringify(emotionValues, null, 2));
  //   }),
  // });

  // const [, set] = useControls("MorphTarget", () =>
  //   Object.assign(
  //     {},
  //     ...Object.keys(nodes.EyeLeft.morphTargetDictionary).map((key) => {
  //       return {
  //         [key]: {
  //           label: key,
  //           value: 0,
  //           min: nodes.EyeLeft.morphTargetInfluences[
  //             nodes.EyeLeft.morphTargetDictionary[key]
  //           ],
  //           max: 1,
  //           onChange: (val: number) => {
  //             if (setupMode) {
  //               lerpMorphTarget(key, val, 1);
  //             }
  //           },
  //         },
  //       };
  //     })
  //   )
  // );

  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const nextBlink = () => {
      blinkTimeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          nextBlink();
        }, 200);
      }, THREE.MathUtils.randInt(1000, 5000));
    };
    nextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  return (
    <group
      {...props}
      dispose={null}
      ref={group}
      position={[0, -2.4, 0]}
      scale={1.6}
    >
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
  );
}

useGLTF.preload("/models/doctor-model.glb");
useGLTF.preload("/models/doctor-animations.glb");
