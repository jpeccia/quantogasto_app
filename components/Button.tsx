import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

interface ButtonProps {
  onPress: () => void
  title: string
  variant?: "primary" | "secondary"
  disabled?: boolean
}

const Container = styled(Animated.createAnimatedComponent(TouchableOpacity))<{
  variant: "primary" | "secondary"
}>`
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${({ variant }) => (variant === "primary" ? "#0ea5e9" : "transparent")};
  border: ${({ variant }) => (variant === "secondary" ? "1px solid #0ea5e9" : "none")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

const ButtonText = styled.Text<{
  variant: "primary" | "secondary"
}>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ variant }) => (variant === "primary" ? "#ffffff" : "#0ea5e9")};
`

export function Button({ onPress, title, variant = "primary", disabled }: ButtonProps) {
  return (
    <Container onPress={onPress} variant={variant} disabled={disabled} entering={FadeIn} exiting={FadeOut}>
      <ButtonText variant={variant}>{title}</ButtonText>
    </Container>
  )
}

