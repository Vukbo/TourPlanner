classDiagram
    UserManager ..> User
    class User {
        -int uid
        +String Username
        +String Password
    }
    class UserManager{
        -List~User~ users
        +create(user:User) bool 
        +delete(id:int) bool
        +get(id:int) User

    }

Tour -- BoundingBox
    TourManager ..> Tour

    class Tour {
      -uid: int
      -name: string
      -description: string
      -from: [string, string]
      -to: [string, string]
      -type: string
      -distance: float
      -estimated_time: float
      -route_info: BoundingBox
    }
    class TourManager{
      -List~Tour~ tours
      +Create(user_id: int, Tour: tour) bool
      +GetTours(user_id: int) List~Tour~
      +GetTour(user_id: int, tour_id: int) Tour
      +Update(user_id: int, tour_id) bool 
      +Delete(user_id: int, tour_id) bool
    }

    class BoundingBox {
        -min_longitude: string
        -min_latitude: string
        -max_longitude: string
        -max_latitude: string
    }