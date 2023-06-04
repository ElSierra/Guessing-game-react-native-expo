import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";


export default function AlertModal({
  showAlert,
  onCancelPressed,
  title
}: {
  showAlert: boolean;
  onCancelPressed: () => void;
  title : string
}) {
  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title= {title}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      overlayStyle={{ flex: 1, backgroundColor: "black", opacity: 0.8 }}
      contentContainerStyle={{ borderRadius: 16, backgroundColor: "#411839" }}
      cancelButtonStyle={{
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
      }}
      titleStyle={{ color: "white", textAlign: "center" }}
      showCancelButton={true}
      showConfirmButton={false}
      cancelText="Okay"
      cancelButtonColor="black"
      onCancelPressed={onCancelPressed}
    />
  );
}
