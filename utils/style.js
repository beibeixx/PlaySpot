import commonColors from "./color";

const commonStyles = {
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

  // PressableButton styles
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