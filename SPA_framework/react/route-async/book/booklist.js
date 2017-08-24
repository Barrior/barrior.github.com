/**
 * Created by weid on 2016/10/27.
 */
import React, {Component} from 'react';
import { Link } from 'react-router';

export default class Booklist extends Component {
    render() {
        return (
            <div className="book-page">
                <h3>Booklist</h3>
                <ul>
                    <li>
                        <Link to="/book/javascript" activeStyle={{color: 'red'}}>
                            javascript
                        </Link>
                    </li>
                    <li>
                        <Link to="/book/go" activeStyle={{color: 'red'}}>
                            go
                        </Link>
                    </li>
                </ul>
                <div className="booklist-children-component">
                    {
                        console.log(
                            'booklist-children-component===================== ',
                            this.props
                        ),
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}