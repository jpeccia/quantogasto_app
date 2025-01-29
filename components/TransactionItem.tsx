import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Trash2 } from "lucide-react-native"

interface TransactionItemProps {
  description: string
  amount: number
  date: Date
  onDelete?: () => void
  onPress?: () => void
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 8px;
`

const Info = styled.View`
  flex: 1;
`

const Description = styled.Text`
  font-size: 16px;
  color: #1a1a1a;
  margin-bottom: 4px;
`

const Date = styled.Text`
  font-size: 14px;
  color: #6b7280;
`

const Amount = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-right: 16px;
`

export function TransactionItem({ description, amount, date, onDelete, onPress }: TransactionItemProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Container>
        <Info>
          <Description>{description}</Description>
          <Date>{format(date, "d 'de' MMMM", { locale: ptBR })}</Date>
        </Info>
        <Amount>
          {amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Amount>
        {onDelete && (
          <TouchableOpacity onPress={onDelete}>
            <Trash2 size={20} color="#ef4444" />
          </TouchableOpacity>
        )}
      </Container>
    </TouchableOpacity>
  )
}

