import { StyleSheet, Text, View, Modal, Pressable} from "react-native";
import React, { useState } from "react";
import Card from "../common/Card";
import PressableButton from "../common/PressableButton";
import ImageManager from "../common/ImageManager";
import { addMemoryPhotoStyles } from "../../styles/components/addMemoryPhoto";

export default function AddMemoryPhotoCard({
  isVisible,
  cancelHandler,
  inputHandler,
  existingPhotos,
}) {
  const [newImageUris, setnewImageUris] = useState([]);
  const [deletedImageUris, setDeletedImageUris] = useState([]);

  function submitHandler() {
    console.log("submit:", newImageUris, deletedImageUris);
    inputHandler(newImageUris, deletedImageUris);
  }

  function receiveImageUri(newUris, deletedUris) {
    setnewImageUris(newUris);
    setDeletedImageUris(deletedUris);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={cancelHandler}
    >
      <Pressable 
        style={addMemoryPhotoStyles.modalContainer}
        onPress={cancelHandler}
      >
        <Pressable 
          style={addMemoryPhotoStyles.contentContainer}
          onPress={e => e.stopPropagation()}
        >
          <View style={addMemoryPhotoStyles.handle} />
          
          <View style={addMemoryPhotoStyles.header}>
            <Text style={addMemoryPhotoStyles.title}>Edit Photos</Text>
            <Text style={addMemoryPhotoStyles.subtitle}>
              Add new photos or remove existing ones from your memory
            </Text>
          </View>

          <View style={addMemoryPhotoStyles.imageSection}>
            <ImageManager
              receiveImageUri={receiveImageUri}
              existingPhotos={existingPhotos}
            />
          </View>

          <View style={addMemoryPhotoStyles.actionContainer}>
            <PressableButton
              pressHandler={cancelHandler}
              componentStyle={addMemoryPhotoStyles.cancelButton}
            >
              <Text style={[addMemoryPhotoStyles.buttonText, addMemoryPhotoStyles.cancelButtonText]}>
                Cancel
              </Text>
            </PressableButton>

            <PressableButton
              pressHandler={submitHandler}
              componentStyle={addMemoryPhotoStyles.submitButton}
            >
              <Text style={[addMemoryPhotoStyles.buttonText, addMemoryPhotoStyles.submitButtonText]}>
                Save Changes
              </Text>
            </PressableButton>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({

});
