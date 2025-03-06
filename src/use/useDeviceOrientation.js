import { ref } from "vue";

const useDeviceOrientation = () => {
    const orientation = ref(null);
    const orientationEventNotGranted = ref(false);

    const handleOrientationChange = (event) => {
        orientation.value = event;
    };

    const registerDeviceOrientationListener = () => {
        unregisterDeviceOrientationListener();

        window.addEventListener(
            "deviceorientation",
            handleOrientationChange,
            true,
        );
    };

    const unregisterDeviceOrientationListener = () => {
        window.removeEventListener(
            "deviceorientation",
            handleOrientationChange,
            true,
        );
    };

    const requestDeviceOrientationPermission = () => {
        if (DeviceOrientationEvent.requestPermission !== undefined) {
            DeviceOrientationEvent.requestPermission()
                .then((response) => {
                    if (response === "granted") {
                        registerDeviceOrientationListener();
                    } else {
                        orientationEventNotGranted.value = false;
                    }
                })
                .catch(console.error);
        } else {
            registerDeviceOrientationListener();
        }
    };

    return {
        orientation,
        handleOrientationChange,
        orientationEventNotGranted,
        registerDeviceOrientationListener,
        requestDeviceOrientationPermission,
        unregisterDeviceOrientationListener,
    };
};

export default useDeviceOrientation;
