// Traditionally, an app grows from the backend to the frontend: core -> use cases -> interface -> UI.  
// However, what I'm exploring here is an architecture with two independent cores—frontend and backend.  
// Both can be built following Clean Architecture principles: the backend following its own Clean Architecture,  
// and the frontend similarly using Clean Architecture.  
// At the end, the frontend will have ports that are connected to the backend through adapters.  
// This results in two independently growing apps, connected via ports and adapters.
