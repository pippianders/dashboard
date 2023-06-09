import styled from "styled-components"
import { getSizeBy, getColor, Icon, TextNano, Text } from "@netdata/netdata-ui"

export const NodesContainer = styled.div`
  .mdc-list-item {
    padding: 0 0;
    padding-left: 0;
  }
  .rmwc-collapsible-list__children {
    .mdc-list-item {
      padding: 0 0;
      padding-left: 0;
      height: ${getSizeBy(4)};
    }
  }
  .rmwc-collapsible-list__handle {
    .mdc-list-item {
      padding: 0 ${getSizeBy(2)};
    }
  }
  .mdc-list-item__meta {
    color: ${getColor("bright")};
  }
  .mdc-list-item:before {
    background: none;
  }
`

export const ListItem = styled.div`
  width: 100%;
  min-height: ${getSizeBy(3)};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
`

export const TrashIcon = styled(Icon)`
  fill: #35414a;
  margin-right: ${getSizeBy(2)};
  transition: opacity 0.4s ease-in;
  &:hover {
    opacity: 0.6;
  }
`

export const StyledIcon = styled(Icon)`
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: ${getSizeBy(2)};
  fill: ${getColor(["gray", "arsenic"])};
`

// @ts-ignore todo extend interface in dashboard due to lack of types in netdata-ui
export const NodeUrl = styled(TextNano.withComponent("a"))`
  text-decoration: none;
  margin-left: ${getSizeBy(5)};
  color: #aeb3b7;
  max-width: 145px;
  word-wrap: break-word;
  &:hover {
    color: inherit; // overwrite bootstrap
    text-decoration: none;
  }
`

// @ts-ignore todo
export const NodeName = styled(Text.withComponent("a"))`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  white-space: nowrap;
`
