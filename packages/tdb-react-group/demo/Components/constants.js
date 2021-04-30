// buttons to display document classes
export const DOCUMENT_CLASS_BUTTONS_CONFIG = {variant: "info", queryName: "Class library"}
export const DOCUMENT_CLASS_LABEL_CONFIG = {color: "#ddd", label: "Document Classes"}

// buttons to display properties
export const PROPERTY_BUTTONS_CONFIG = {variant: "light", queryName: "Property library"}
export const PROPERTY_LABEL_CONFIG = {color: "#ddd", label: "Properties"}


// button to run query 
export const RUN_QUERY_CONFIG = {label:"Run", title: "Run Query", icon: "fas fa-play", variant: "outline-primary", size:"sm"}
// button to save query 
export const SAVE_QUERY_CONFIG = {label:"Save", title: "Save query as favorite", icon: "far fa-star", variant: "outline-primary", size:"sm"}
// button to get new query pane
export const NEW_PANE_CONFIG = {label:"New Query Pane", title: "Add New Query Pane", icon: "fas fa-plus", variant: "primary", size:"sm"}
// button to collapse a pane
export const COLLAPSE_BUTTON_GROUP={label:"Collapse", title: "Collapse Pane", icon: "fas fa-chevron-up", variant: "outline-primary", size:"sm"}
export const UNCOLLAPSE_BUTTON_GROUP={label:"Collapse", title: "Collapse Pane", icon: "fas fa-chevron-down", variant: "outline-primary", size:"sm"}

// link buttons for standard queries
export const GET_CLASSES_LINK={label:"Get Classes", title: "Get Classes", type: "link", variant: "light", size:"sm"}
export const GET_PROPERTIES_LINK={label:"Get Properties", title: "Get Properties", type: "link", variant: "light", size:"sm"}
export const GET_DOCUMENT_METADATA_LINK={label:"Get Document Meta data", title: "Get Properties", type: "link", variant: "light", size:"sm"}

//views to see results
export const TABLE_VIEW = "TABLE"
export const GRAPH_VIEW = "GRAPH"

// download controllers for result views
export const TABLE_RESULT_CONTROLLER = {variant: "outline-primary", list:["Save as .csv", "Save as .txt", "Save as .json"]}
export const GRAPH_RESULT_CONTROLLER = {variant: "outline-primary", list:["Save as .png", "Save as .svg"]}


//button group for query actions
export const ACTIONS_QUERY_BUTTON_GROUP={variant: "outline-primary", size: "sm", buttons: [{id: "Copy", title: "Copy Script", icon: "far fa-clipboard"}, {id: "Import", title: "Import Script", icon: "fas fa-arrow-up"}, {id: "Export", title: "Export Script", icon: "fas fa-arrow-down"}]}
//button group for language switcher 
export const LANGUAGE_SWITCHER_BUTTON_GROUP= {variant: "outline-primary", size: "sm", buttons: [{id: "JS", title: "JS", label: "JS"}, {id: "JSON", title: "JSON", label: "JSON"}]}
//button group for view chooser
export const VIEW_SWITCHER_BUTTON_GROUP= {variant: "outline-primary", size: "sm", buttons: [
    {/*icon: "fas fa-border-none",*/ id: TABLE_VIEW, title: TABLE_VIEW, label: TABLE_VIEW}, 
    {/*icon: "fas fa-bezier-curve",*/ id: GRAPH_VIEW, title: GRAPH_VIEW, label: GRAPH_VIEW}]}


//text area for commit msg 
export const COMMIT_TEXT_AREA = { placeholder:"Add an optional description for update", icon: "far fa-envelope"}
// text area to input name of saved query 
export const SAVE_QUERY_NAME_TEXT_AREA = {placeholder:"Add a name to save query as"}

// language list for query pane
export const LANGUAGE_LIST = ["JS", "JSON-LD"]


//Labels
export const DOCUMENT_CLASS_LABEL =  "Document Classes"
export const PROPERTIES_LABEL =  "Properties"

//Messages
export const NO_PROPERTIES = "No properties for class "


// side bar tabs
export const DATABASE_TAB = "Database"
export const SAMPLE_QUERIES = "Sample Queries"
export const SAVED_QUERIES = "Saved Queries"

