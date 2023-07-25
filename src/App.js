import { Button, Col, Input, Row, Select } from "antd";
import React from "react";
import Title from "./components/Title";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: React.version,
      rows: [
        { operation: "plus", value: 100, enabled: true },
        { operation: "plus", value: 30, enabled: true },
        { operation: "minus", value: 7, enabled: true },
      ],
    };
  }

  calculateTotal() {
    const { rows } = this.state;
    return rows.reduce((sum, row) => {
      return row.enabled
        ? row.operation === "plus"
          ? sum + Number(row.value)
          : sum - Number(row.value)
        : sum;
    }, 0);
  }

  handleAddRow = () => {
    this.setState((prevState) => ({
      rows: [...prevState.rows, { operation: "plus", value: 0, enabled: true }],
    }));
  };

  handleRemoveRow = (index) => {
    this.setState((prevState) => {
      const updatedRows = [...prevState.rows];
      updatedRows.splice(index, 1);
      return { rows: updatedRows };
    });
  };

  handleSignChange = (index, operation) => {
    this.setState((prevState) => {
      const updatedRows = [...prevState.rows];
      updatedRows[index].operation = operation;
      return { rows: updatedRows };
    });
  };

  handleValueChange = (index, value) => {
    var pattern = /^\d*((\.)\d*)?$/;
    if (value.match(pattern)) {
      console.log(value);
      this.setState((prevState) => {
        const updatedRows = [...prevState.rows];
        updatedRows[index].value = value;
        return { rows: updatedRows };
      });
    }
  };

  handleEnableChange = (index, value) => {
    this.setState((prevState) => {
      const updatedRows = [...prevState.rows];
      updatedRows[index].enabled = value;
      return { rows: updatedRows };
    });
  };

  render() {
    return (
      <div className="page-wrap">
        <Title>React Version: {this.state.version}</Title>
        <Button
          type="primary"
          onClick={this.handleAddRow}
          style={{ marginLeft: 8 }}
        >
          Add row
        </Button>
        {this.state.rows.map((r, i) => (
          <Row key={i} style={{ margin: 16 }}>
            <Col span={3}>
              <Select
                style={{ width: "100%" }}
                size="m"
                options={[
                  { value: "plus", label: "+" },
                  { value: "minus", label: "-" },
                ]}
                value={r.operation}
                onChange={(val) => this.handleSignChange(i, val)}
              />
            </Col>
            <Col span={8} style={{ paddingLeft: 8 }}>
              <Input
                style={{ width: "100%" }}
                value={r.value}
                onChange={(evt) => this.handleValueChange(i, evt.target.value)}
                disabled={!r.enabled}
              />
            </Col>
            <Col style={{ paddingLeft: 8 }}>
              <Button
                onClick={() => this.handleRemoveRow(i)}
                type="primary"
                danger
              >
                Delete
              </Button>
            </Col>
            <Col style={{ paddingLeft: 8 }}>
              <Button onClick={() => this.handleEnableChange(i, !r.enabled)}>
                {r.enabled ? "Disable" : "Enable"}
              </Button>
            </Col>
          </Row>
        ))}
        <div style={{ marginLeft: 8 }}>Total: {this.calculateTotal()}</div>
      </div>
    );
  }
}

export default App;
