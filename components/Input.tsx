import { TextInput, type TextInputProps } from "react-native"
import styled from "styled-components/native"
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated"

interface InputProps extends TextInputProps {
  error?: string
  label: string
}

const Container = styled.View`
  margin-bottom: 16px;
  width: 100%;
`

const Label = styled.Text`
  font-size: 14px;
  color: #1a1a1a;
  margin-bottom: 8px;
`

const StyledInput = styled(TextInput)`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
`

const ErrorText = styled(Animated.Text)`
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
`

export function Input({ label, error, ...rest }: InputProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledInput placeholderTextColor="#9ca3af" {...rest} />
      {error && (
        <ErrorText entering={FadeInUp} exiting={FadeOutDown}>
          {error}
        </ErrorText>
      )}
    </Container>
  )
}

