import { Component, h, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'home-page',
  styleUrl: 'home-page.scss',
})
export class HomePage {
  @State() doctors: [any];
  @State() departments: [string];
  @State() selected: string;
  @Prop() history: RouterHistory;

  componentWillLoad() {
    let url: string = 'http://localhost:3001/doctors';
    let query: string = location.search;
    this.getFromServer(url + query);
  }

  handleChange(e: any) {
    let url: string = 'http://localhost:3001/doctors';
    let query: string = '';

    if (e.target.value != 'All') {
      query = `?department=${e.target.value}`;
      url = url + query;
    }
    this.history.push(`/${query}`);
    this.getFromServer(url);
  }

  getFromServer(url: string) {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.doctors = res.doctors;
        this.departments = res.departments;
      });
  }
  render() {
    return (
      <div class="container">
        <p> Choose a department: </p>
        <select onChange={e => this.handleChange(e)}>
          <option value="" disabled selected>
            Select your option
          </option>
          <option>All</option>
          {this.departments?.map(d => (
            <option>{d}</option>
          ))}
        </select>
        <div class="cardContainer">
          {this.doctors?.map(doc => (
            <div class="drCard">
              <img
                src="data:image/jpeg;base64,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"
                alt="dr img"
              />
              <p>
                Name: {doc.name}
                <br></br>
                Department: {doc.department}
                <br></br>
                Status: {doc.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
