var React = require('react');
var Header   = require('./Header');
var Folder   = require('./Folder');

class App extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div>
                <Snippet/>
            </div>
        )
    }
}

module.exports = App;
