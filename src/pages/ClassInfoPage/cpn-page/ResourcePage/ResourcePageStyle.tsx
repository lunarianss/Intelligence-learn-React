import styled from 'styled-components'
export const ResourcePageWrapper = styled.div`
  font-size: 18px;
  .flex {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
`
export const ResourceHeaderWrapper = styled.div`
  padding: 10px 20px;
  margin-bottom: 10px;
`
export const ResourceTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--blue);
  div.Resource-page-title {
    border-left: 5px solid var(--blue);
    line-height: 40px;
    padding-left: 10px;
  }
  padding-bottom: 10px;
`
