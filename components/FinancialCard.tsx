import Animated, { FadeInUp } from "react-native-reanimated"
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react-native"
import styled from "styled-components"

interface FinancialCardProps {
  title: string
  amount: number
  type: "income" | "expense" | "balance"
  delay?: number
}

const Container = styled(Animated.View)`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
`

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`

const Title = styled.Text`
  font-size: 14px;
  color: #6b7280;
  margin-left: 8px;
`

const Amount = styled.Text<{ type: "income" | "expense" | "balance" }>`
  font-size: 24px;
  font-weight: bold;
  color: ${({ type }) => {
    switch (type) {
      case "income":
        return "#10b981"
      case "expense":
        return "#ef4444"
      default:
        return "#1a1a1a"
    }
  }};
`

export function FinancialCard({ title, amount, type, delay = 0 }: FinancialCardProps) {
  const Icon = {
    income: ArrowUpRight,
    expense: ArrowDownRight,
    balance: Minus,
  }[type]

  const iconColor = {
    income: "#10b981",
    expense: "#ef4444",
    balance: "#1a1a1a",
  }[type]

  return (
    <Container entering={FadeInUp.delay(delay)}>
      <Header>
        <Icon size={20} color={iconColor} />
        <Title>{title}</Title>
      </Header>
      <Amount type={type}>
        {amount.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </Amount>
    </Container>
  )
}

