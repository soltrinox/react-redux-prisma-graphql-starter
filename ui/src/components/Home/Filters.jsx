import React from 'react'
import {Switch, Form, Icon, Tooltip} from 'antd'
import styled from 'styled-components'
import {useStore, useActions} from 'easy-peasy'

export default function Filters() {
  const {change} = useActions(actions => actions.filters)
  const filters = useStore(store => store.filters)
  return (
    <FiltersStyles>
      <Form layout="inline">
        <Form.Item>
          <Tooltip
            title="Show only challenges with bonus points"
            placement="bottomLeft"
          >
            <Icon type="crown" className="toggle-icon" />
          </Tooltip>
          <Switch
            checked={filters.showOnlyChallengesWithBonus}
            checkedChildren="on"
            unCheckedChildren="off"
            onChange={value =>
              change({filter: 'showOnlyChallengesWithBonus', value})
            }
          />
        </Form.Item>
        <Form.Item>
          <Tooltip title="Show challenges that are solved" placement="bottom">
            <Icon type="check-circle" className="toggle-icon" />
          </Tooltip>
          <Switch
            checked={filters.showAlreadySolvedChallenges}
            checkedChildren="on"
            unCheckedChildren="off"
            onChange={value =>
              change({filter: 'showAlreadySolvedChallenges', value})
            }
          />
        </Form.Item>
      </Form>
    </FiltersStyles>
  )
}

const FiltersStyles = styled.div`
  margin: 10px;
  padding: 10px 20px;
  border-radius: 6px;
  background-color: ${props => props.theme.dark_gray_3};
  color: ${props => props.theme.gray_1};
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);

  .ant-form-item-label label {
    color: ${props => props.theme.gray_1};
  }

  .ant-form-item-children {
    display: flex;
    align-items: center;
  }

  .ant-switch {
    margin: 0;

    &:not(.ant-switch-checked) {
      background-color: #f15555eb;
    }
    &.ant-switch-checked {
      background-color: #5fbd6b;
    }
  }

  .toggle-icon {
    color: ${props => props.theme.gray_1};
    font-size: 24px;
    margin-right: 10px;
  }
`
