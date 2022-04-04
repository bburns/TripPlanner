// markdown
// a component that renders two react-markdown areas, split on a [more...] button

import React from 'react';
import ReactMarkdown from 'react-markdown'; // https://github.com/rexxars/react-markdown

import './styles.css';


export default class extends React.Component {

  state = {
    hidden: true,
  };

  onClick = () => {
    this.setState(() => ({ hidden: !this.state.hidden }));
  };

  render() {

    // const [source1, source2] = this.props.source.split('[more]');
    let i = this.props.source.indexOf(' ', 200) + 1;
    if (i < 200) i = 9999;
    // const [source1, source2] = [this.props.source.slice(0, 200), this.props.source.slice(200)];
    const [source1, source2] = [this.props.source.slice(0, i), this.props.source.slice(i)];
    const class1 = 'first';
    const class2 = 'second ' + (this.state.hidden ? 'hidden' : '');
    // const buttonText = this.state.hidden ? '[more...]' : '[less...]';
    const buttonText = this.state.hidden ? '[more...]' : '';

    return (
      <div className="markdown">
        {/* see https://github.com/rexxars/react-markdown for options */}
        <ReactMarkdown className={class1} source={source1} />
        {source2 &&
          <span>
            <span className="more" onClick={this.onClick} role="button">{buttonText}</span>
            <ReactMarkdown className={class2} source={source2} />
          </span>
        }
      </div>
    );
  }
}
