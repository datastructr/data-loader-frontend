import React, {Component, PropTypes} from 'react';

import { 
  Row,
  Col,
  Card, 
  Icon,
  Badge
} from 'antd';

class HeaderMapper extends Component {

  generateCardTitle(header) {
    console.log(header.toJS())
    let status = header.get('rowsPassedFailed') === 0 
      ? "success"
      : "error";

    return (
      <span><Badge status={status} /> {header.get('id')} <Icon type="arrow-right Header-map-pointer" /> {header.get('headerMap').column}</span>
    )
  }

  generateCardBody(rulesFailed){
    if(rulesFailed.size === 0) {
      return <p>All Checks Passed</p>
    }
    return rulesFailed.map(rule => {
      return <p onClick={() => {this.props.showTableFocusCell(rule.cell.get('id'))}} >Cell Error: {rule.check}</p>
    })
  }

  render() {
    const {
      headerData
    } = this.props;

    let mappedHeaders = headerData.filter(header => header.get('headerMapped'));
     
    return (
        <div className="Uploader-header-mappings">
          <Row gutter={16}>
          {mappedHeaders.map(header => 
            <Col span={8}>
              <Card title={this.generateCardTitle(header)}>
                {this.generateCardBody(header.get('allRulesFailed'))}
              </Card>
            </Col>
          )}
          </Row>
        </div>
    );
  }
}

HeaderMapper.propTypes = {
  headerData: PropTypes.object.isRequired
};

export default HeaderMapper;