import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import PressableButton from "../common/PressableButton";
import { memoCardStyles } from "../../styles/components/memoCard";
import { colors } from "../../styles/helper/colors";

export default function MemoCard({
  isVisible,
  onCancel,
  onSubmit,
  initialMemo = "",
}) {
  const [memo, setMemo] = React.useState(initialMemo);

  const handleSubmit = () => {
    onSubmit(memo);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={memoCardStyles.modalContainer}
        >
          <Pressable style={memoCardStyles.modalContainer} onPress={onCancel}>
            <Pressable
              style={memoCardStyles.contentContainer}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={memoCardStyles.handle} />

              <View style={memoCardStyles.header}>
                <Text style={memoCardStyles.title}>Add Memo</Text>
              </View>

              <View style={memoCardStyles.inputContainer}>
                <TextInput
                  value={memo}
                  onChangeText={setMemo}
                  style={memoCardStyles.input}
                  multiline
                  placeholder="Write your memo here..."
                  placeholderTextColor={colors.text.placeholder}
                />
              </View>

              <View style={memoCardStyles.actionContainer}>
                <PressableButton
                  pressHandler={onCancel}
                  componentStyle={memoCardStyles.cancelButton}
                >
                  <Text
                    style={[
                      memoCardStyles.buttonText,
                      memoCardStyles.cancelButtonText,
                    ]}
                  >
                    Cancel
                  </Text>
                </PressableButton>

                <PressableButton
                  pressHandler={handleSubmit}
                  componentStyle={memoCardStyles.submitButton}
                >
                  <Text
                    style={[
                      memoCardStyles.buttonText,
                      memoCardStyles.submitButtonText,
                    ]}
                  >
                    Save
                  </Text>
                </PressableButton>
              </View>
            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({});
