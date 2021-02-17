import React, { Component } from 'react';
import CategoryItem from './CategoryItem';

class Search extends Component {
    state = {
        data: [],
        search: '',
    }
    componentDidMount() {
        fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${this.props.match.params.query}&apiKey=84fe766ead804aee905fa97fc4f9ead9`
        )
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data: json.results });
            });
    }
    handleChange = (event) => {
        this.setState({ search: event.target.value });
    }
    handleSearch = (event) => {
        fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${this.state.search}&apiKey=84fe766ead804aee905fa97fc4f9ead9`
        )
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data: json.results });
            });
        event.preventDefault()
    }
    render() {
        return (
            <div className="search">
                <form action="" className='searchbar'>
                    <input type="text" placeholder='What are you in the mood for?' onChange={this.handleChange} />
                    <button onClick={this.handleSearch}>Search</button>
                </form>
                <div id='category'>
                    {this.state.data.map((elt) => (
                        <CategoryItem
                            key={elt.id}
                            id={elt.id}
                            url={elt.image}
                            title={elt.title}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Search;