import { useEffect } from "react"
import styled from "styled-components/native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { Wifi, WifiOff } from "lucide-react-native"
import { useConnectivity } from "../hooks/useConnectivity"

const Container = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ isConnected }) => (isConnected ? "#10b981" : "#ef4444")};
`

const StatusText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  margin-left: 8px;
`

export function ConnectivityStatus() {
  const { isConnected, isSyncing } = useConnectivity()
  const translateY = useSharedValue(-100)

  useEffect(() => {
    translateY.value = withSpring(0)

    if (isConnected) {
      const timeout = setTimeout(() => {
        translateY.value = withSpring(-100)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [isConnected, translateY]) // Added translateY to dependencies

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <Container style={animatedStyle} isConnected={isConnected}>
      {isConnected ? <Wifi size={20} color="#ffffff" /> : <WifiOff size={20} color="#ffffff" />}
      <StatusText>
        {isConnected ? (isSyncing ? "Sincronizando dados..." : "Conexão restabelecida") : "Você está offline"}
      </StatusText>
    </Container>
  )
}

