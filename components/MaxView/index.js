import { Icon } from 'antd';
import css from './index.less';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMax: false };
  }
  onClick() {
    this.setState({ isMax: !this.state.isMax });
  }
  render() {
    const { children } = this.props;
    const { isMax } = this.state;
    return (
      <div className={css.box} style={{ position: isMax ? 'fixed' : 'relative' }}>
        <div>
          <div
            onDoubleClick={() => {
              this.onClick();
            }}
          >
            <div>标题</div>
            <div>
              <Icon
                type={isMax ? 'fullscreen-exit' : 'fullscreen'}
                title={isMax ? '点击还原' : '全屏展示'}
                onClick={() => {
                  this.onClick();
                }}
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}
