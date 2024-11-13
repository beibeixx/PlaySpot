import commonColors from "./color";

const commonStyles = {
  // container styles
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  galleryContainer: {
    marginVertical: 20,
  },
  // PlanList styles
  itemCard: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#bee893',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  planName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c506b',
  },
  timeText: {
    fontSize: 14,
    color: '#2c506b',
  },
  // text styles
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c506b',
  },
  // PressableButton styles
  editButton: {
    padding: 10,
    margin: 10,
    backgroundColor: "#74e0aa",
    borderRadius: 5,
  },
  alertButton: {
    padding: 10,
    margin: 10,
    backgroundColor: "#f8d7da",
    borderRadius: 5,
  },
  pressed: {
    backgroundColor: commonColors.itemBackgroundSelected,
    opacity: 0.8,
    borderRadius: 5,
  },
  disabled: {
    backgroundColor: 'gray',
  },
};

export default commonStyles;