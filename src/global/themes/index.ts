import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default {
	colors: {
		line: '#DCDDE0',
		background: '#F2F3F5',
		background_secondary: '#FFFFFF',

		title: '#2E384D',
		subtitle: '#2E384D',
		text: '#666666',
		text_light: '#E0E3FF',
		text_details: '#ABABAB',

		attention: '#E83F5B',
		attention_dark: '#E83F5B',
		attention_light: '#EC788B',
		attention_title: '#E83F5B',
		attention_background: '#FFF5F5',
		attention_hover_title: '#FFFFFF',
		attention_hover_background: '#E83F5B',

		success: '#4CD62B',
		success_dark: '#4CD62B',
		success_light: '#7BED60',
		success_title: '#3FB023',
		success_background: '#F7FFF5',
		success_hover_title: '#FFFFFF',
		success_hover_background: '#4CD62B',

		main: '#5965E0',
		main_dark: '#4953B8',
		main_light: '#AFB4E4',
		main_title: '#FFFFFF',
		main_background: '#D3D7FD',
		main_hover_title: '#FFFFFF',
		main_hover_background: '#4953B8',

		secondary: '#2AA9E0',
		secondary_dark: '#2AA9E0',
		secondary_light: '#86D0F0',
		secondary_title: '#2AA9E0',
		secondary_background: '#F5FCFF',
		secondary_hover_title: '#FFFFFF',
		secondary_hover_background: '#2AA9E0',
	},
	fonts: {
		family: {
			title: 'Inter_600SemiBold',
			subtitle: 'Inter_500Medium',
			text: 'Inter_400Regular',

			button: 'Inter_600SemiBold',
			button_secondary: 'Inter_500Medium',
		},
		size: {
			extra_largue: RFValue(30),
			largue: RFValue(24),
			medium: RFValue(18),
			small: RFValue(14),
			extra_small: RFValue(12),
		},
	},
	display: {
		padding_app: 20,
		border_radius: 8,
		active_opacity: 0.7,
		window_width: Dimensions.get('window').width,
		window_height: Dimensions.get('window').height,
		button_height: RFValue(65),
	},
};
