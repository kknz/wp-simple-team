/**
 * BLOCK: wp-simple-team
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import classnames from 'classnames';

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	RichText,
	MediaUpload,
	BlockControls,
	InspectorControls,
} = wp.editor;

const {
	Button,
	TextControl,
	Toolbar,
	IconButton,
	PanelBody,
	RangeControl,
	ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

const memberPlaceholder = {
	profileID: 0,
	// eslint-disable-next-line no-undef
	profileURL: _wpSimpleTeam.avatarURL,
	name: 'John Doe',
	position: 'Leader',
	description: __( 'Write the description…', 'wp-simple-team' ),
};

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'wst/block-wp-simple-team', {
	title: __( 'WP Simple Team', 'wp-simple-team' ),
	icon: 'groups',
	category: 'common',
	keywords: [
		__( 'wp-simple-team' ),
		__( 'wp simple team' ),
		__( 'simple team' ),
		__( 'team' ),
	],
	attributes: {
		members: {
			type: 'array',
			default: [ memberPlaceholder, memberPlaceholder, memberPlaceholder ],
			source: 'query',
			selector: '.team-member',
			query: {
				profileID: {
					type: 'number',
					source: 'attribute',
					selector: 'img',
					attribute: 'data-id',
				},
				profileURL: {
					source: 'attribute',
					selector: 'img',
					attribute: 'src',
				},
				name: {
					source: 'children',
					selector: '.name',
				},
				position: {
					source: 'children',
					selector: '.position',
				},
				description: {
					source: 'children',
					selector: '.description',
				},
			},
		},
		columns: {
			type: 'number',
			default: 3,
		},
		hasCroppedPhoto: {
			type: 'boolean',
			default: false,
		},
	},
	edit: ( props ) => {
		const {
			className,
			attributes: {
				members,
				columns,
				hasCroppedPhoto,
			},
			setAttributes,
		} = props;

		const onSelectImage = ( media, index ) => {
			setAttributes( {
				members: [
					...members.slice( 0, index ),
					{
						...members[ index ],
						profileID: media.id,
						profileURL: media.url,
					},
					...members.slice( index + 1 ),
				],
			} );
		};

		const onChangeName = ( value, index ) => {
			setAttributes( {
				members: [
					...members.slice( 0, index ),
					{
						...members[ index ],
						name: value,
					},
					...members.slice( index + 1 ),
				],
			} );
		};

		const onChangePosition = ( value, index ) => {
			setAttributes( {
				members: [
					...members.slice( 0, index ),
					{
						...members[ index ],
						position: value,
					},
					...members.slice( index + 1 ),
				],
			} );
		};

		const onChangeDescription = ( value, index ) => {
			setAttributes( {
				members: [
					...members.slice( 0, index ),
					{
						...members[ index ],
						description: value,
					},
					...members.slice( index + 1 ),
				],
			} );
		};

		const onAddMember = () => {
			setAttributes( {
				members: [ ...members, memberPlaceholder ],
			} );
		};

		const onRemoveMember = () => {
			if ( members.length > 1 ) {
				const newMembers = [ ...members ];
				newMembers.splice( -1, 1 );
				setAttributes( {
					members: newMembers,
				} );
			}
		};

		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<IconButton
							className="components-toolbar__control"
							label={ __( 'Remove Team Member', 'wp-simple-team' ) }
							icon="minus"
							onClick={ onRemoveMember }
						/>
						<IconButton
							className="components-toolbar__control"
							label={ __( 'Add Team Member', 'wp-simple-team' ) }
							icon="plus"
							onClick={ onAddMember }
						/>
					</Toolbar>
				</BlockControls>
				<InspectorControls>
					<PanelBody>
						<RangeControl
							label={ __( 'Team Columns', 'wp-simple-team' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 1 }
							max={ 6 }
						/>
						<ToggleControl
							label={ __( 'Crop Photo', 'wp-simple-team' ) }
							checked={ hasCroppedPhoto }
							onChange={ () => setAttributes( { hasCroppedPhoto: ! hasCroppedPhoto } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classnames(
					className,
					{ 'has-scroll': columns > 3 },
				) }>
					<ul className={ classnames(
						'team-members',
						'columns-' + columns,
						{ 'is-cropped': hasCroppedPhoto },
					) }>
						{ members.map( ( member, index ) => {
							return (
								<li className="team-member" key={ index }>
									<div className="profile-image">
										<MediaUpload
											onSelect={ ( media ) => onSelectImage( media, index ) }
											allowedTypes="image"
											value={ member.profileID }
											render={ ( { open } ) => (
												<Button className="" onClick={ open }>
													<img src={ member.profileURL } alt={ __( 'Profile Image', 'wp-simple-team' ) } />
												</Button>
											) }
										/>
									</div>
									<TextControl
										label="Name"
										value={ member.name }
										onChange={ ( value ) => onChangeName( value, index ) }
										className="name"
									/>
									<TextControl
										label="Position"
										value={ member.position }
										onChange={ ( value ) => onChangePosition( value, index ) }
										className="position"
									/>
									<RichText
										tagName="div"
										placeholder={ __( 'Write the description…', 'wp-simple-team' ) }
										value={ member.description }
										onChange={ ( value ) => onChangeDescription( value, index ) }
										className="description"
									/>
								</li>
							);
						} ) }
					</ul>
				</div>
			</Fragment>
		);
	},
	save: function( { attributes, className } ) {
		const {
			members,
			columns,
			hasCroppedPhoto,
		} = attributes;

		return (
			<div className={ classnames(
				className,
				'front-end',
			) }>
				<ul className={ classnames(
					'team-members',
					'columns-' + columns,
					{ 'is-cropped': hasCroppedPhoto },
				) }>
					{ members.map( ( member, index ) => {
						return (
							<li className="team-member" key={ index }>
								<div className="profile-image">
									<img src={ member.profileURL } data-id={ member.profileID } alt={ __( 'Profile Image', 'wp-simple-team' ) } />
									<div className="member-name">
										<span className="name">{ member.name }</span> - <span className="position">{ member.position }</span>
									</div>
								</div>
								<div className="description">
									{ member.description }
								</div>
							</li>
						);
					} ) }
				</ul>
			</div>
		);
	},
} );
