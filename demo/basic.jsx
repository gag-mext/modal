import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../src';
import Button from '@gag/button';
import WhiteSpace from '@gag/white-space';
import WingBlank from '@gag/wing-blank';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  showModal = (e) => {
    // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      visible: true,
    });
  }
  onClose = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <WhiteSpace />
        <WingBlank>
          <Button onClick={this.showModal}>Modal 对话框</Button>
        </WingBlank>
        <WhiteSpace />
        <Modal
          title="这是 title"
          transparent
          maskClosable={false}
          visible={this.state.visible}
          onClose={this.onClose}
          footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose(); } }]}
        >
          这是内容...<br />
          这是内容...<br />
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('sk-root'));
