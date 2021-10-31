tabBarStyle: styles.tabBarStyle,


const styles = StyleSheet.create({
	tabBarStyle: {
		position: 'absolute',
		height: RFValue(65),
		left: 10,
		right: 10,
		bottom: getBottomSpace() + 10,
		borderRadius: 15,
		backgroundColor: '#ffffff',

		shadowColor: '#7F5DF0',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		elevation: 5,
		shadowRadius: 3.5,
		shadowOpacity: 0.25,
	},
});