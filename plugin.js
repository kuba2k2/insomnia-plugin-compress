const zlib = require('zlib');

module.exports.templateTags = [{
    name: 'compression',
    displayName: 'Compression',
    description: 'Compress/decompress data with Base64.',
    args: [
		{
			name: 'action',
			displayName: 'Compress/Decompress',
			type: 'enum',
			options: [
				{
					displayName: 'Compress',
					value: 'compress',
				},
				{
					displayName: 'Decompress',
					value: 'decompress',
				},
			],
		},
        {
			name: 'algorithm',
			displayName: 'Algorithm',
			type: 'enum',
			options: [
				{
					displayName: 'Deflate',
					value: 'deflate',
				},
				{
					displayName: 'Deflate+ZLIB header',
					value: 'zlib',
				},
				{
					displayName: 'GZIP',
					value: 'gzip',
				},
			],
		},
		{
			name: 'data',
			displayName: 'Data',
			type: 'string',
			placeholder: 'Data to compress/decompress',
		}
    ],
    async run (context, action, algorithm, data) {
        switch (action) {
			case 'compress':
				switch (algorithm) {
					case 'deflate':
						return zlib.deflateRawSync(Buffer.from(data)).toString('base64');
					case 'zlib':
						return zlib.deflateSync(Buffer.from(data)).toString('base64');
					case 'gzip':
						return zlib.gzipSync(Buffer.from(data)).toString('base64');
				}
				break;
			case 'decompress':
				switch (algorithm) {
					case 'deflate':
						return zlib.inflateRawSync(Buffer.from(data, 'base64')).toString('utf-8');
					case 'zlib':
						return zlib.inflateSync(Buffer.from(data, 'base64')).toString('utf-8');
					case 'gzip':
						return zlib.gunzipSync(Buffer.from(data, 'base64')).toString('utf-8');
				}
				break;
		}
    }
}];
