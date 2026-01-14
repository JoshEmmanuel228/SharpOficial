
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';

const Model = ({ url, rotation }) => {
    const { scene } = useGLTF(url);
    return <primitive object={scene} rotation={rotation} />;
};

const SculptureModel = ({ modelUrl, rotation = [0, 0, 0] }) => {
    return (
        <div className="w-full h-96 bg-transparent">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6}>
                        <Model url={modelUrl} rotation={rotation} />
                    </Stage>
                </Suspense>
                <OrbitControls enableZoom={false} autoRotate={false} />
            </Canvas>
        </div>
    );
};

export default SculptureModel;
