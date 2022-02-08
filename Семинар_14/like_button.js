'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {liked: false};
    }

    render() {
        if (this.state.liked)
            return e(
                'button',
                { onClick: () => this.setState({liked: false}) },
                'Like'
            );
        else
            return e(
                'button',
                { onClick: () => this.setState({liked: true}) },
                this.props.commentID
            );
    }
}

document.querySelectorAll('.like_button_container')
    .forEach(domContainer => {
        const commentID = parseInt(domContainer.dataset.commentid, 10);
        ReactDOM.render(
            e(LikeButton, {commentID: commentID}),
            domContainer
        );
    });