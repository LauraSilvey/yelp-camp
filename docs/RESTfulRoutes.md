| Name    | Path                  | HTTP Verb | Purpose                                                 |
|---------|-----------------------|-----------|---------------------------------------------------------|
| Index   | /campgrounds          | GET       | List all campgrounds                                    |
| New     | /campgrounds/new      | GET       | Show new campground form                                |
| Create  | /campgrounds          | POST      | Create a new campground, then redirect somewhere        |
| Show    | /campgrounds/:id      | GET       | Show info for one specific campground                   |
| Edit    | /campgrounds/:id/edit | GET       | Show edit form for one campground                       |
| Update  | /campgrounds/:id      | PUT       | Update a particular campground, then redirect somewhere |
| Destroy | /dogs/:id             | DELETE    | Delete a particular campground, then redirect somewhere |
