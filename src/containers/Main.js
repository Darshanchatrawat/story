import React from 'react'
import styled from 'styled-components'


function Main({ children }) {
  return (
    <main className="h-full overflow-y-auto">
      <MainContainer className="container grid sm:px-6 px-3 mx-auto">{children}</MainContainer>
    </main>
  )
}
const MainContainer = styled.div`
@media (max-width: 1024px) {
  max-width:100%;
}
`

export default Main
